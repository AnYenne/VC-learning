/* Chấm điểm shadowing / chính tả: so khớp từng từ giữa câu gốc và câu người học. */
(function (root) {
  function normW(w) {
    return w
      .normalize('NFKC')
      .toLowerCase()
      .replace(/[’‘`]/g, "'")
      .replace(/[^\p{L}\p{N}]/gu, '');
  }

  function lev(a, b) {
    const m = a.length, n = b.length;
    if (!m) return n;
    if (!n) return m;
    let prev = new Array(n + 1), cur = new Array(n + 1);
    for (let j = 0; j <= n; j++) prev[j] = j;
    for (let i = 1; i <= m; i++) {
      cur[0] = i;
      for (let j = 1; j <= n; j++) {
        const c = a[i - 1] === b[j - 1] ? 0 : 1;
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + c);
      }
      [prev, cur] = [cur, prev];
    }
    return prev[n];
  }

  function sim(a, b) {
    if (a === b) return 1;
    return 1 - lev(a, b) / Math.max(a.length, b.length);
  }

  // Trả về { events, score, counts }
  // events: [{t:'ok'|'close'|'wrong'|'miss'|'extra', ref?, hyp?}]
  function words(text, locale) {
    if (typeof Intl.Segmenter === 'function') {
      return [...new Intl.Segmenter(locale || 'und', { granularity: 'word' }).segment(text)]
        .filter(part => part.isWordLike)
        .map(part => part.segment);
    }
    return text.split(/\s+/).filter(Boolean);
  }

  function align(refText, hypText, locale) {
    const R = words(refText, locale).map(raw => ({ raw, n: normW(raw) })).filter(x => x.n);
    const H = words(hypText, locale).map(raw => ({ raw, n: normW(raw) })).filter(x => x.n);
    const n = R.length, m = H.length;
    const D = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
    for (let i = 0; i <= n; i++) D[i][0] = i;
    for (let j = 0; j <= m; j++) D[0][j] = j;

    const subCost = (a, b) => {
      if (a === b) return 0;
      return sim(a, b) >= 0.7 ? 0.4 : 1.2;
    };

    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= m; j++) {
        D[i][j] = Math.min(
          D[i - 1][j - 1] + subCost(R[i - 1].n, H[j - 1].n),
          D[i - 1][j] + 1,
          D[i][j - 1] + 1
        );
      }
    }

    const events = [];
    let i = n, j = m;
    const eq = (x, y) => Math.abs(x - y) < 1e-9;
    while (i > 0 || j > 0) {
      if (i > 0 && j > 0) {
        const a = R[i - 1].n, b = H[j - 1].n;
        if (eq(D[i][j], D[i - 1][j - 1] + subCost(a, b))) {
          const t = a === b ? 'ok' : sim(a, b) >= 0.7 ? 'close' : 'wrong';
          events.push({ t, ref: R[i - 1].raw, hyp: H[j - 1].raw });
          i--; j--;
          continue;
        }
      }
      if (i > 0 && eq(D[i][j], D[i - 1][j] + 1)) {
        events.push({ t: 'miss', ref: R[i - 1].raw });
        i--;
        continue;
      }
      events.push({ t: 'extra', hyp: H[j - 1].raw });
      j--;
    }
    events.reverse();

    const counts = { ok: 0, close: 0, wrong: 0, miss: 0, extra: 0 };
    events.forEach(e => counts[e.t]++);
    const score = n
      ? Math.max(0, Math.round(((counts.ok + 0.6 * counts.close - 0.3 * counts.extra) / n) * 100))
      : 0;
    return { events, score, counts, total: n };
  }

  function quantile(values, fraction) {
    if (!values.length) return null;
    const sorted = [...values].sort((a, b) => a - b);
    return sorted[Math.min(sorted.length - 1, Math.floor((sorted.length - 1) * fraction))];
  }

  function assessAcoustics(samples, sampleRate, expectedDuration) {
    const factor = Math.max(1, Math.floor(sampleRate / 12000));
    const rate = sampleRate / factor;
    const frameSize = Math.round(rate * 0.04);
    const hopSize = Math.round(rate * 0.02);
    if (!samples || samples.length < frameSize * factor || !Number.isFinite(rate) || rate <= 0) return null;

    const frameEnergy = [];
    for (let start = 0; start + frameSize * factor <= samples.length; start += hopSize * factor) {
      let sum = 0;
      for (let i = 0; i < frameSize; i++) {
        const value = samples[start + i * factor];
        sum += value * value;
      }
      frameEnergy.push({ start, rms: Math.sqrt(sum / frameSize) });
    }
    const peak = frameEnergy.reduce((maximum, frame) => Math.max(maximum, frame.rms), 0);
    if (peak < 0.004) return null;
    const active = frameEnergy.map((frame, index) => ({ ...frame, index }))
      .filter(frame => frame.rms >= Math.max(0.004, peak * 0.3));
    if (active.length < 3) return null;

    const dynamicRange = 20 * Math.log10(
      Math.max(0.0001, quantile(active.map(frame => frame.rms), 0.85)) /
      Math.max(0.0001, quantile(active.map(frame => frame.rms), 0.2))
    );
    const stress = Math.round(Math.max(0, 100 - Math.abs(dynamicRange - 11) * 4.5));

    const minLag = Math.max(1, Math.floor(rate / 500));
    const maxLag = Math.min(Math.floor(rate / 70), frameSize - 1);
    const pitches = [];
    for (const frame of active) {
      const localStart = Math.max(0, frame.start - Math.floor(frameSize * factor / 2));
      let mean = 0;
      for (let i = 0; i < frameSize; i++) mean += samples[localStart + i * factor] || 0;
      mean /= frameSize;
      let bestLag = 0, bestCorrelation = 0;
      for (let lag = minLag; lag <= maxLag; lag++) {
        let cross = 0, left = 0, right = 0;
        for (let i = 0; i < frameSize - lag; i++) {
          const a = (samples[localStart + i * factor] || 0) - mean;
          const b = (samples[localStart + (i + lag) * factor] || 0) - mean;
          cross += a * b;
          left += a * a;
          right += b * b;
        }
        const correlation = cross / Math.sqrt(left * right || 1);
        if (correlation > bestCorrelation) {
          bestCorrelation = correlation;
          bestLag = lag;
        }
      }
      if (bestLag && bestCorrelation >= 0.35) pitches.push(rate / bestLag);
    }
    let intonation = null;
    if (pitches.length >= 3) {
      const semitones = pitches.map(pitch => 12 * Math.log2(pitch));
      const center = quantile(semitones, 0.5);
      const stablePitch = semitones.filter(value => Math.abs(value - center) <= 6);
      if (stablePitch.length >= 3) {
        const range = quantile(stablePitch, 0.9) - quantile(stablePitch, 0.1);
        intonation = Math.round(Math.max(0, 100 - Math.abs(range - 7) * 7.5));
      }
    }

    const first = active[0].index;
    const last = active[active.length - 1].index;
    const speechDuration = (last - first + 1) * hopSize / rate;
    let rhythm = null;
    if (Number.isFinite(expectedDuration) && expectedDuration > 0 && speechDuration > 0) {
      const durationRatio = speechDuration / expectedDuration;
      rhythm = Math.round(Math.max(0, 100 - Math.abs(Math.log2(durationRatio)) * 35));
    }
    return { rhythm, stress, intonation };
  }

  const api = { align, assessAcoustics, normW, words, lev, sim };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.Score = api;
})(typeof window !== 'undefined' ? window : this);

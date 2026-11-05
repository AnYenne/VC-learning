// ShadowDesk server: lấy phụ đề YouTube, gộp thành câu, dịch, và phục vụ giao diện.
// Chạy: node server.js   (cần Node 18+, không cần cài gói nào)
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUB = path.join(__dirname, 'public');
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
};

/* ---------- phụ đề YouTube ---------- */

function decode(s) {
  for (let k = 0; k < 2; k++) {
    s = s
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
      .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n));
  }
  return s;
}

function clean(s) {
  return decode(s.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();
}

function parseCaptionXml(xml) {
  const out = [];
  let m;
  let re = /<text start="([\d.]+)"(?: dur="([\d.]+)")?[^>]*>([\s\S]*?)<\/text>/g;
  while ((m = re.exec(xml))) {
    const start = +m[1];
    out.push({ start, end: start + (+m[2] || 2), text: clean(m[3]) });
  }
  if (out.length) return out;
  re = /<p t="(\d+)"(?: d="(\d+)")?[^>]*>([\s\S]*?)<\/p>/g;
  while ((m = re.exec(xml))) {
    const start = +m[1] / 1000;
    out.push({ start, end: start + (+m[2] || 2000) / 1000, text: clean(m[3]) });
  }
  return out;
}

// Tách theo dấu câu; với phụ đề chữ Hán không dấu câu thì giữ ranh giới cue.
function mergeCues(cues, locale) {
  const timedParts = [];
  const compactScript = /^(zh|ja|th|lo|km|my)(?:-|$)/i.test(locale || '');
  let text = '';
  for (const cue of cues) {
    const part = cue.text && cue.text.trim();
    if (!part) continue;
    if (text && !compactScript) text += ' ';
    const start = text.length;
    text += part;
    timedParts.push({ start, end: text.length, cue: { ...cue, text: part } });
  }
  if (!text) return [];

  const segmenter = new Intl.Segmenter(locale || 'und', { granularity: 'sentence' });
  const sentenceParts = [...segmenter.segment(text)];
  const nonEmptyCues = cues.filter(cue => cue.text && cue.text.trim());
  if (compactScript && sentenceParts.length === 1 && nonEmptyCues.length > 1) {
    return nonEmptyCues.map(cue => ({
      start: Math.round(cue.start * 100) / 100,
      end: Math.round(cue.end * 100) / 100,
      text: cue.text.trim(),
    }));
  }
  function timeAt(offset) {
    const part = timedParts.find(p => offset >= p.start && offset <= p.end) ||
      timedParts.find(p => offset < p.start) || timedParts[timedParts.length - 1];
    const relative = Math.max(0, Math.min(part.cue.text.length, offset - part.start));
    const words = [...part.cue.text.matchAll(/\S+/g)];
    const before = words.filter(w => w.index + w[0].length <= relative).length;
    const ratio = words.length ? before / words.length : 0;
    return part.cue.start + (part.cue.end - part.cue.start) * ratio;
  }

  const out = [];
  for (const item of sentenceParts) {
    const leading = item.segment.length - item.segment.trimStart().length;
    const sentence = item.segment.trim();
    if (!sentence) continue;
    const startOffset = item.index + leading;
    const endOffset = startOffset + sentence.length;
    const sentenceCues = timedParts.filter(part => part.start < endOffset && part.end > startOffset);
    const spansCues = sentenceCues.length > 1;
    out.push({
      start: spansCues ? sentenceCues[0].cue.start : timeAt(startOffset),
      end: spansCues ? sentenceCues[sentenceCues.length - 1].cue.end : timeAt(endOffset),
      text: sentence,
    });
  }
  for (let i = 0; i < out.length - 1; i++) {
    if (out[i].end > out[i + 1].start) out[i].end = out[i + 1].start;
  }
  return out.map(l => ({
    start: Math.round(l.start * 100) / 100,
    end: Math.round(l.end * 100) / 100,
    text: l.text,
  }));
}

async function tracksFromInnertube(id) {
  const r = await fetch('https://www.youtube.com/youtubei/v1/player?prettyPrint=false', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'user-agent': 'com.google.android.youtube/20.10.38 (Linux; U; Android 14)',
    },
    body: JSON.stringify({
      context: { client: { clientName: 'ANDROID', clientVersion: '20.10.38', hl: 'en' } },
      videoId: id,
    }),
  });
  if (!r.ok) throw new Error('innertube ' + r.status);
  const j = await r.json();
  return {
    title: j?.videoDetails?.title || '',
    tracks: j?.captions?.playerCaptionsTracklistRenderer?.captionTracks || [],
  };
}

async function tracksFromWatchPage(id) {
  const r = await fetch('https://www.youtube.com/watch?v=' + id + '&hl=en', {
    headers: { 'user-agent': 'Mozilla/5.0', 'accept-language': 'en-US,en;q=0.9' },
  });
  const html = await r.text();
  const m = html.match(/"captionTracks":(\[.*?\])/);
  const t = html.match(/<title>(.*?) - YouTube<\/title>/);
  return {
    title: t ? decode(t[1]) : '',
    tracks: m ? JSON.parse(m[1]) : [],
  };
}

function chineseScript(language) {
  if (/(?:^zh-Hant|-(?:TW|HK|MO)$)/i.test(language)) return 'traditional';
  if (/(?:^zh-Hans|-(?:CN|SG)$)/i.test(language)) return 'simplified';
  return '';
}

function matchesLanguage(candidate, requested) {
  if (candidate === requested || candidate.startsWith(requested + '-')) return true;
  const candidateBase = candidate.split('-')[0].toLowerCase();
  const requestedBase = requested.split('-')[0].toLowerCase();
  if (candidateBase !== requestedBase) return false;
  if (requestedBase !== 'zh') return requested === requestedBase;
  const wantedScript = chineseScript(requested);
  const candidateScript = chineseScript(candidate);
  return !wantedScript || !candidateScript || wantedScript === candidateScript;
}

async function getTranscript(id, lang) {
  let info = { title: '', tracks: [] };
  try { info = await tracksFromInnertube(id); } catch (e) { /* thử cách khác */ }
  if (!info.tracks.length) {
    try { info = await tracksFromWatchPage(id); } catch (e) { /* bỏ qua */ }
  }
  const { tracks, title } = info;
  const languages = [...new Map(tracks.filter(t => t.languageCode).map(t => [t.languageCode, {
    code: t.languageCode,
    name: t.name?.simpleText || t.languageCode,
  }])).values()];
  if (!tracks.length) {
    const cached = readCache(id);
    const requestedLang = !lang || lang === 'auto' ? null : lang;
    if (cached && (!requestedLang || matchesLanguage(cached.language || '', requestedLang))) {
      return { ...cached, language: cached.language || 'en', languages: cached.languages || [] };
    }
    if (cached && requestedLang) {
      const err = new Error('Phụ đề AI đã lưu dùng ngôn ngữ ' + (cached.language || 'không xác định') +
        ', không phải ngôn ngữ đã chọn (' + requestedLang + '). Hãy chọn Tự động hoặc ngôn ngữ khớp.');
      err.status = 404;
      throw err;
    }
    const err = new Error('Video này không có phụ đề, hoặc YouTube đang chặn truy cập từ máy chủ này.');
    err.status = 404;
    err.canAsr = true;
    err.languages = languages;
    throw err;
  }
  const requestedLang = !lang || lang === 'auto' ? null : lang;
  const byLang = requestedLang
    ? tracks.filter(t => t.languageCode && matchesLanguage(t.languageCode, requestedLang))
    : tracks;
  const exactLangTracks = requestedLang ? byLang.filter(t => t.languageCode === requestedLang) : [];
  const compatibleTracks = exactLangTracks.length ? exactLangTracks : byLang;
  const pick = requestedLang
    ? compatibleTracks.find(t => t.kind !== 'asr') || compatibleTracks[0]
    : byLang.find(t => t.isDefault && t.kind !== 'asr') ||
      byLang.find(t => t.kind !== 'asr') || byLang[0];
  if (!pick) {
    const cached = readCache(id);
    if (cached && matchesLanguage(cached.language || '', requestedLang)) return { ...cached, languages };
    const err = new Error('Video không có phụ đề cho ngôn ngữ đã chọn. Ngôn ngữ có sẵn: ' + languages.map(l => l.code).join(', '));
    err.status = 404;
    err.languages = languages;
    throw err;
  }
  const url = pick.baseUrl.replace(/&fmt=[^&]*/, '');
  const xml = await (await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0' } })).text();
  const cues = parseCaptionXml(xml);
  if (!cues.length) {
    const err = new Error('Không đọc được nội dung phụ đề.');
    err.status = 502;
    throw err;
  }
  return {
    id, title, auto: pick.kind === 'asr', language: pick.languageCode,
    languages, lines: mergeCues(cues, pick.languageCode),
  };
}

/* ---------- AI tạo phụ đề từ âm thanh (cho video không có phụ đề) ---------- */
// Cần: yt-dlp + ffmpeg trong PATH, và MỘT trong hai:
//   - biến môi trường OPENAI_API_KEY (dùng Whisper qua API), hoặc
//   - Python có gói faster-whisper (chạy Whisper ngay trên máy, miễn phí).
const { spawn } = require('child_process');
const os = require('os');
const CACHE = path.join(__dirname, 'cache');
fs.mkdirSync(CACHE, { recursive: true });
const CHUNK_SECONDS = 600;
const jobs = new Map(); // id -> { state, step, progress, error }

function readCache(id) {
  try { return JSON.parse(fs.readFileSync(path.join(CACHE, id + '.json'), 'utf8')); } catch (e) { return null; }
}

const whisperLanguageCodes = {
  afrikaans: 'af', albanian: 'sq', amharic: 'am', arabic: 'ar', armenian: 'hy', assamese: 'as',
  azerbaijani: 'az', bashkir: 'ba', basque: 'eu', belarusian: 'be', bengali: 'bn', bosnian: 'bs',
  breton: 'br', bulgarian: 'bg', burmese: 'my', cantonese: 'zh', catalan: 'ca', chinese: 'zh',
  croatian: 'hr', czech: 'cs', danish: 'da', dutch: 'nl', english: 'en', estonian: 'et',
  faroese: 'fo', finnish: 'fi', french: 'fr', galician: 'gl', georgian: 'ka', german: 'de',
  greek: 'el', gujarati: 'gu', haitian: 'ht', hebrew: 'he', hindi: 'hi', hungarian: 'hu',
  icelandic: 'is', indonesian: 'id', italian: 'it', japanese: 'ja', javanese: 'jv', kannada: 'kn',
  kazakh: 'kk', khmer: 'km', korean: 'ko', lao: 'lo', latvian: 'lv', lithuanian: 'lt',
  luxembourgish: 'lb', malay: 'ms', malayalam: 'ml', maori: 'mi', marathi: 'mr', mongolian: 'mn',
  nepali: 'ne', norwegian: 'no', occitan: 'oc', pashto: 'ps', persian: 'fa', polish: 'pl',
  portuguese: 'pt', punjabi: 'pa', romanian: 'ro', russian: 'ru', sanskrit: 'sa', serbian: 'sr',
  shona: 'sn', sindhi: 'sd', sinhala: 'si', slovak: 'sk', slovenian: 'sl', somali: 'so',
  spanish: 'es', sundanese: 'su', swahili: 'sw', swedish: 'sv', tagalog: 'tl', tajik: 'tg',
  tamil: 'ta', tatar: 'tt', telugu: 'te', thai: 'th', tibetan: 'bo', turkish: 'tr',
  turkmen: 'tk', ukrainian: 'uk', urdu: 'ur', uzbek: 'uz', vietnamese: 'vi', welsh: 'cy',
  yiddish: 'yi', yoruba: 'yo',
};

function normalizeWhisperLanguage(language) {
  const value = (language || '').trim();
  return whisperLanguageCodes[value.toLowerCase()] ||
    (/^[a-z]{2,3}(?:-[a-z]{2})?$/i.test(value) ? value : 'und');
}

function run(cmd, args, opts, input) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, opts);
    let out = '', err = '';
    p.stdout.on('data', d => (out += d));
    p.stderr.on('data', d => (err += d));
    p.on('error', e => reject(new Error(
      e.code === 'ENOENT'
        ? 'Chưa cài "' + cmd + '". Xem hướng dẫn cài Python trong README.'
        : cmd + ' không chạy được: ' + e.message)));
    p.on('close', code => (code === 0 ? resolve(out) : reject(new Error(cmd + ' lỗi: ' + err.slice(-400)))));
    if (input !== undefined) p.stdin.end(input);
  });
}

async function pronounceMany(texts, language) {
  const command = process.env.PYTHON || (process.platform === 'win32' ? 'python' : 'python3');
  const output = await run(command, [path.join(__dirname, 'pronounce.py'), language], undefined, JSON.stringify(texts));
  return JSON.parse(output);
}

async function whisperOpenAI(file) {
  const form = new FormData();
  form.append('file', new Blob([fs.readFileSync(file)], { type: 'audio/mpeg' }), path.basename(file));
  form.append('model', process.env.OPENAI_ASR_MODEL || 'whisper-1');
  form.append('response_format', 'verbose_json');
  const r = await fetch('https://api.openai.com/v1/audio/transcriptions', {
    method: 'POST',
    headers: { authorization: 'Bearer ' + process.env.OPENAI_API_KEY },
    body: form,
  });
  if (!r.ok) throw new Error('OpenAI trả lỗi ' + r.status + ': ' + (await r.text()).slice(0, 200));
  const j = await r.json();
  return {
    language: normalizeWhisperLanguage(j.language),
    languageName: j.language || '',
    segments: (j.segments || []).map(s => ({ start: s.start, end: s.end, text: (s.text || '').trim() })),
  };
}

async function whisperLocal(files) {
  const out = await run(process.env.PYTHON || 'python3',
    [path.join(__dirname, 'transcribe.py'), process.env.WHISPER_MODEL || 'small', ...files]);
  return JSON.parse(out);
}

async function runAsr(id, job) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'shadowdesk-'));
  try {
    job.step = 'Đang tải âm thanh từ YouTube…';
    const url = 'https://www.youtube.com/watch?v=' + id;
    let title = '';
    try { title = (await run('yt-dlp', ['--no-playlist', '--skip-download', '--print', 'title', url])).trim(); } catch (e) { /* không bắt buộc */ }
    await run('yt-dlp', ['--no-playlist', '-f', 'bestaudio', '-x', '--audio-format', 'mp3', '-o', path.join(dir, 'a.%(ext)s'), url]);

    job.step = 'Đang xử lý âm thanh…';
    await run('ffmpeg', ['-y', '-i', path.join(dir, 'a.mp3'), '-ac', '1', '-ar', '16000', '-b:a', '32k',
      '-f', 'segment', '-segment_time', String(CHUNK_SECONDS), '-reset_timestamps', '1', path.join(dir, 'c%03d.mp3')]);
    const chunks = fs.readdirSync(dir).filter(f => /^c\d+\.mp3$/.test(f)).sort().map(f => path.join(dir, f));
    if (!chunks.length) throw new Error('Không tách được âm thanh.');

    const useOpenAI = process.env.ASR === 'openai' || (process.env.ASR !== 'local' && process.env.OPENAI_API_KEY);
    let perChunk = [];
    if (useOpenAI) {
      for (let i = 0; i < chunks.length; i++) {
        job.step = 'AI đang nghe và chép lời (' + (i + 1) + '/' + chunks.length + ')…';
        job.progress = i / chunks.length;
        perChunk.push(await whisperOpenAI(chunks[i]));
      }
    } else {
      job.step = 'Whisper đang chạy trên máy bạn (lần đầu sẽ tải model, có thể vài phút)…';
      const local = await whisperLocal(chunks);
      perChunk = local.chunks.map((segments, i) => ({
        segments,
        language: i === 0 ? normalizeWhisperLanguage(local.language) : '',
        languageName: i === 0 ? local.language : '',
      }));
    }

    const cues = [];
    perChunk.forEach(({ segments }, i) => segments.forEach(s => {
      if (s.text) cues.push({ start: s.start + i * CHUNK_SECONDS, end: s.end + i * CHUNK_SECONDS, text: s.text });
    }));
    if (!cues.length) throw new Error('AI không nghe được lời nói nào trong video này.');
    const detected = perChunk.find(c => c.language);
    const language = detected?.language || 'und';
    const data = {
      id, title, auto: true, ai: true, language,
      languages: [{ code: language, name: detected?.languageName || language }],
      lines: mergeCues(cues, language),
    };
    fs.writeFileSync(path.join(CACHE, id + '.json'), JSON.stringify(data));
    job.state = 'done';
    job.step = 'Xong';
  } catch (e) {
    job.state = 'error';
    job.error = e.message;
  } finally {
    fs.rm(dir, { recursive: true, force: true }, () => {});
  }
}

function asrStart(id) {
  const cached = readCache(id);
  if (cached) return { state: 'done' };
  let job = jobs.get(id);
  if (!job || job.state === 'error') {
    job = { state: 'running', step: 'Đang bắt đầu…', progress: 0, error: '' };
    jobs.set(id, job);
    runAsr(id, job);
  }
  return job;
}

/* ---------- dịch ---------- */

const tcache = new Map();
function translationLanguage(language) {
  const value = (language || 'auto').trim();
  if (!value || value.toLowerCase() === 'und') return 'auto';
  if (/^zh(?:-Hans|-CN|-SG)?$/i.test(value)) return 'zh-CN';
  if (/^zh(?:-Hant|-TW|-HK|-MO)$/i.test(value)) return 'zh-TW';
  return value;
}

function googleTranslationText(data) {
  if (typeof data === 'string') return data.trim();
  if (!Array.isArray(data)) return '';
  if (Array.isArray(data[0])) return data[0].map(part => part?.[0] || '').join('').trim();
  return typeof data[0] === 'string' ? data[0].trim() : '';
}

async function translateWithGoogle(q, sl, tl) {
  const url = new URL('https://clients5.google.com/translate_a/t');
  url.search = new URLSearchParams({ client: 'dict-chrome-ex', sl, tl, q }).toString();
  const r = await fetch(url, { signal: AbortSignal.timeout(10000) });
  if (!r.ok) throw new Error('Google Translate trả lỗi ' + r.status);
  const text = googleTranslationText(await r.json());
  if (!text) throw new Error('Google Translate trả về bản dịch rỗng.');
  return text;
}

async function translateWithMyMemory(q, sl, tl) {
  const url = new URL('https://api.mymemory.translated.net/get');
  url.search = new URLSearchParams({ q, langpair: sl + '|' + tl }).toString();
  const r = await fetch(url, { signal: AbortSignal.timeout(10000) });
  if (!r.ok) throw new Error('MyMemory trả lỗi ' + r.status);
  const data = await r.json();
  if (data.responseStatus !== 200 || data.quotaFinished) {
    throw new Error(data.responseDetails || 'MyMemory không thể dịch yêu cầu này.');
  }
  const text = (data.responseData?.translatedText || '').trim();
  if (!text) throw new Error('MyMemory trả về bản dịch rỗng.');
  return text;
}

async function gt(q, tl, sourceLang) {
  const sl = translationLanguage(sourceLang || 'auto');
  const target = translationLanguage(tl || 'vi');
  const key = sl + '|' + target + '|' + q;
  if (tcache.has(key)) return tcache.get(key);
  try {
    const text = await translateWithGoogle(q, sl, target);
    tcache.set(key, text);
    return text;
  } catch (googleError) {
    try {
      const text = await translateWithMyMemory(q, sl, target);
      tcache.set(key, text);
      return text;
    } catch (fallbackError) {
      const error = new Error('Dịch thất bại. Google: ' + googleError.message + '; MyMemory: ' + fallbackError.message);
      error.status = 502;
      throw error;
    }
  }
}

async function translateMany(lines, tl, sourceLang) {
  const out = new Array(lines.length).fill('');
  const failed = [];
  const errors = [];
  let next = 0;
  async function worker() {
    while (next < lines.length) {
      const i = next++;
      try { out[i] = await gt(lines[i], tl, sourceLang); }
      catch (e) {
        failed.push(i);
        if (errors.length < 3) errors.push(e.message);
      }
    }
  }
  await Promise.all(Array.from({ length: 3 }, worker));
  return { translations: out, failed, errors };
}

/* ---------- HTTP ---------- */

function send(res, code, obj) {
  res.writeHead(code, { 'content-type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(obj));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', c => {
      size += c.length;
      if (size > 2e6) { reject(new Error('quá lớn')); req.destroy(); return; }
      chunks.push(c);
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  const u = new URL(req.url, 'http://localhost');
  try {
    if (u.pathname === '/api/transcript') {
      const id = u.searchParams.get('v') || '';
      if (!/^[\w-]{11}$/.test(id)) return send(res, 400, { error: 'Link YouTube không hợp lệ.' });
      return send(res, 200, await getTranscript(id, u.searchParams.get('lang') || 'auto'));
    }
    if (u.pathname === '/api/asr/start' || u.pathname === '/api/asr/status') {
      const id = u.searchParams.get('v') || '';
      if (!/^[\w-]{11}$/.test(id)) return send(res, 400, { error: 'Link YouTube không hợp lệ.' });
      const job = u.pathname === '/api/asr/start' ? asrStart(id) : (readCache(id) ? { state: 'done' } : jobs.get(id) || { state: 'idle' });
      return send(res, 200, { state: job.state, step: job.step, error: job.error, progress: job.progress });
    }
    if (u.pathname === '/api/translate') {
      const q = (u.searchParams.get('q') || '').slice(0, 500);
      const tl = u.searchParams.get('tl') || 'vi';
      const sl = u.searchParams.get('sl') || 'auto';
      if (!q) return send(res, 200, { t: '', pronunciation: null });
      const [translation, pronunciation] = await Promise.allSettled([
        gt(q, tl, sl),
        pronounceMany([q], sl),
      ]);
      if (translation.status === 'rejected') throw translation.reason;
      return send(res, 200, {
        t: translation.value,
        pronunciation: pronunciation.status === 'fulfilled' ? pronunciation.value[0] : null,
        pronunciationError: pronunciation.status === 'rejected' ? pronunciation.reason.message : '',
      });
    }
    if (u.pathname === '/api/translate-batch' && req.method === 'POST') {
      const body = JSON.parse(await readBody(req));
      const lines = Array.isArray(body.lines) ? body.lines.slice(0, 1500) : [];
      const sl = body.sl || 'auto';
      const [result, pronunciations] = await Promise.all([
        translateMany(lines, body.tl || 'vi', sl),
        pronounceMany(lines, sl).then(value => ({ value }), error => ({ error: error.message })),
      ]);
      return send(res, 200, {
        t: result.translations,
        failed: result.failed,
        errors: result.errors,
        pronunciations: pronunciations.value || [],
        pronunciationError: pronunciations.error || '',
      });
    }
    // file tĩnh
    let p = u.pathname === '/' ? '/index.html' : u.pathname;
    const file = path.normalize(path.join(PUB, p));
    if (!file.startsWith(PUB)) { res.writeHead(403); return res.end(); }
    fs.readFile(file, (err, data) => {
      if (err) { res.writeHead(404); return res.end('Not found'); }
      res.writeHead(200, { 'content-type': MIME[path.extname(file)] || 'application/octet-stream' });
      res.end(data);
    });
  } catch (e) {
    send(res, e.status || 500, {
      error: e.message || 'Lỗi máy chủ',
      canAsr: !!e.canAsr,
      languages: e.languages || [],
    });
  }
});

if (require.main === module) server.listen(PORT, () => console.log('ShadowDesk chạy tại http://localhost:' + PORT));
module.exports = { parseCaptionXml, mergeCues };

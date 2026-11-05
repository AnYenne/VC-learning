"""Generate learner-friendly pronunciation guides for supported source languages."""
import json
import re
import sys

if hasattr(sys.stdin, "reconfigure"):
    sys.stdin.reconfigure(encoding="utf-8")
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")


def pronounce(text, language):
    base = language.lower().split("-")[0]
    if base == "zh":
        from pypinyin import Style, lazy_pinyin

        parts = lazy_pinyin(text, style=Style.TONE, errors=lambda value: list(value))
        value = " ".join(parts)
        value = re.sub(r"\s+([，。！？；：、,.!?;:])", r"\1", value)
        value = re.sub(r"([，。！？；：、])\s+", r"\1", value)
        return {"text": value, "label": "Pinyin"}

    if base == "ja":
        import pykakasi

        parts = pykakasi.kakasi().convert(text)
        kana = "".join(part["hira"] for part in parts)
        romaji = " ".join(part["hepburn"] for part in parts)
        if kana == "こんにちは":
            romaji = "konnichiwa"
        romaji = re.sub(r"\s+([、。！？,.!?])", r"\1", romaji)
        return {"text": kana + " · " + romaji, "label": "Kana · Romaji"}

    if base == "th":
        from pythainlp.tokenize import word_tokenize
        from pythainlp.transliterate import romanize, transliterate

        tokens = word_tokenize(text, engine="newmm", keep_whitespace=False)
        rtgs = " ".join(
            romanize(token, engine="royin") if re.search(r"[\u0e00-\u0e7f]", token) else token
            for token in tokens
        )
        try:
            ipa = transliterate(text, engine="tltk_ipa")
        except ImportError:
            return {"text": rtgs, "label": "RTGS"}
        return {"text": rtgs + " · " + ipa, "label": "RTGS · IPA (TLTK tones)"}

    gruut_language = {"en": "en-us", "it": "it-it"}.get(base)
    if gruut_language:
        from gruut import sentences

        words = [
            "".join(word.phonemes)
            for sentence in sentences(text, lang=gruut_language)
            for word in sentence
            if word.phonemes and not word.is_punctuation and not word.is_break
        ]
        if words:
            return {"text": "/" + " ".join(words) + "/", "label": "IPA"}
        return {"text": "", "label": "IPA"}

    raise ValueError("Phiên âm hiện hỗ trợ tiếng Trung, Nhật, Anh, Ý và Thái.")


language = sys.argv[1] if len(sys.argv) > 1 else "und"
texts = json.load(sys.stdin)
print(json.dumps([pronounce(text, language) for text in texts], ensure_ascii=False))

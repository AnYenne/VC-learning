"""Split Thai subtitle cues into sentence-sized segments."""
import json
import re
import sys

if hasattr(sys.stdin, "reconfigure"):
    sys.stdin.reconfigure(encoding="utf-8")
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

from pythainlp.tokenize import sent_tokenize


texts = json.load(sys.stdin)
def split_at_subject_changes(text):
    endings = (
        "ครับ|ค่ะ|คะ|จ้ะ|จ๊ะ|ไหม|มั้ย|หรือ|เลย|แล้ว|นะ|สิ|ล่ะ|เหรอ|หรอ"
        "|มาก|ด้วย|หรอก|แหละ"
    )
    subjects = "ผม|ฉัน|ดิฉัน|เรา|คุณ|เขา|เธอ|มัน|พวกเรา|พวกเขา"
    boundary = re.compile(r"(?P<ending>" + endings + r")(?P<space>\s+)(?=" + subjects + r")")
    parts = []
    start = 0
    for match in boundary.finditer(text):
        end = match.start("space")
        if text[start:end].strip():
            parts.append(text[start:end].strip())
        start = match.end("space")
    if text[start:].strip():
        parts.append(text[start:].strip())
    return parts or [text.strip()]


result = []
for text in texts:
    parts = []
    for fragment in re.split(r"\s*>{2,}\s*", text):
        fragment = fragment.strip()
        if not fragment:
            continue
        sentences = [part.strip() for part in sent_tokenize(fragment, engine="thaisum") if part.strip()]
        if len(sentences) == 1:
            sentences = split_at_subject_changes(fragment)
        parts.extend(sentences)
    merged = []
    for part in parts:
        if re.fullmatch(r"[.!?。！？…ฯ]+", part) and merged:
            merged[-1] += part
        else:
            merged.append(part)
    result.append(merged or [text.strip()])

print(json.dumps(result, ensure_ascii=False))

"""Chạy Whisper cục bộ bằng faster-whisper và tự nhận diện ngôn ngữ.
Dùng: python3 transcribe.py <model> <file1.mp3> [file2.mp3 ...]
In ra JSON gồm ngôn ngữ được nhận diện và các segment cho từng file.
"""
import json
import sys

from faster_whisper import WhisperModel

model_name = sys.argv[1]
files = sys.argv[2:]

model = WhisperModel(model_name, compute_type="int8")
result = []
detected_language = ""
for f in files:
    segments, info = model.transcribe(f, vad_filter=True)
    if not detected_language:
        detected_language = info.language
    result.append([{"start": s.start, "end": s.end, "text": s.text.strip()} for s in segments])

print(json.dumps({"language": detected_language, "chunks": result}))

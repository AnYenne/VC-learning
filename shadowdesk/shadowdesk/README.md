# ShadowDesk

Học ngôn ngữ qua video YouTube: dán link, chọn phụ đề/ngôn ngữ gốc của video, xem transcript kèm bản dịch, luyện shadowing có chấm điểm và chép chính tả.

## Chạy

Cần Node 18 trở lên. Không cần `npm install`.

```
node server.js
```

Mở http://localhost:3000, dán link YouTube (hoặc mã video 11 ký tự) rồi bấm "Tải video".

## Tính năng

- **Transcript song ngữ**: chọn một trong các ngôn ngữ phụ đề có sẵn của video; mặc định ưu tiên track mặc định. Transcript được tách theo câu; với phụ đề tiếng Trung không có dấu câu, app dùng ranh giới cue YouTube để tránh gộp cả video thành một dòng. Bản dịch dùng ngôn ngữ nguồn đã chọn và báo những câu dịch lỗi. Bấm một dòng để nhảy đến câu đó.
- **Phiên âm**: hiển thị pinyin có dấu thanh cho tiếng Trung, kana/romaji cho tiếng Nhật, và IPA cho tiếng Anh/Ý dưới bản dịch mỗi câu và trong thẻ tra từ.
- **Phân tích câu**: chạy miễn phí trên máy bằng quy tắc cho tiếng Anh, Trung, Nhật và Ý. Với các mẫu nhận diện được, hiển thị công thức, cấp độ, giải thích ngữ pháp và ngữ cảnh. Bộ mẫu tiếng Anh được tham khảo từ [tổng hợp ngữ pháp cơ bản](https://zim.vn/tong-hop-ngu-phap-tieng-anh-co-ban) và [200 cấu trúc thông dụng](https://zim.vn/200-cau-truc-ngu-phap-tieng-anh-thong-dung), gồm các thì, mẫu V-ing/to-V, câu điều kiện, đảo ngữ, giả định, bị động, nhượng bộ, so sánh và mệnh đề; nội dung giải thích trong ứng dụng được biên soạn lại.
  - **Tiếng Ý**: các mẫu từ A1 đến B2 gồm mạo từ, sở hữu, essere, động từ khuyết thiếu, passato prossimo, imperfetto, tương lai, so sánh, mệnh đề thời gian/nhượng bộ, congiuntivo, câu điều kiện, bị động và đại từ clitico. Tham khảo [tài liệu ngữ pháp Ý A1–B2 trên Scribd](https://www.scribd.com/document/1061490659/Ng%E1%BB%AF-phap-%C3%9D) và [One World Italiano](https://oneworlditaliano.com/grammatica-italiana/riferimento-grammaticale/); các quy tắc và ví dụ trong app được viết lại.
  - **Tiếng Trung**: các mẫu căn bản đến nâng cao được gắn nhãn tham khảo HSK 1–6, gồm câu hỏi, 是/的, lượng từ, 在/有, 了/过, so sánh, bổ ngữ, 把/被, điều kiện, nhượng bộ, nguyên nhân-kết quả và cấu trúc lập luận. Danh mục đối chiếu: [HSK 1](https://resources.allsetlearning.com/chinese/grammar/HSK_1_grammar_points), [HSK 2](https://resources.allsetlearning.com/chinese/grammar/HSK_2_grammar_points), [HSK 3](https://resources.allsetlearning.com/chinese/grammar/HSK_3_grammar_points), [HSK 4](https://resources.allsetlearning.com/chinese/grammar/HSK_4_grammar_points), [HSK 5](https://resources.allsetlearning.com/chinese/grammar/HSK_5_grammar_points), [HSK 6](https://resources.allsetlearning.com/chinese/grammar/HSK_6_grammar_points). Đây là nhãn theo hệ sáu cấp truyền thống để định hướng, không phải chứng nhận chính thức; [HSK hiện hành](https://www.chinesetest.cn/syllabus) đang chuyển sang khung ba giai đoạn, chín cấp.
  - Các cấp tiếng Ý và tiếng Trung chỉ là mức tham khảo của bộ quy tắc, không thay thế đánh giá giáo viên. Đây là bộ nhận diện theo mẫu, không phải bộ phân tích ngữ pháp tổng quát; một số câu có thể chứa cấu trúc không được nhận diện hoặc cần ngữ cảnh để phân biệt.
- **Tra từ**: bấm vào từ bất kỳ để xem bản dịch, phiên âm và nghe phát âm.
- **Shadowing**: nghe câu mẫu, bấm "Nói theo", đọc lại. App nhận giọng nói, so từng từ với câu gốc, cho điểm 0 đến 100 và tô màu từ đúng, gần đúng, bị sót. Có nút nghe lại giọng của bạn.
- **Chính tả**: nghe câu (thường hoặc chậm), gõ lại, chấm điểm và hiện chỗ sai. Có gợi ý từng từ.
- Điểm cao nhất của mỗi câu được lưu trong trình duyệt, hiện ở cột phải.
- Phím tắt: ← → chuyển câu, R nghe lại, Enter chấm chính tả, Ctrl+Enter nghe lại khi đang gõ.

## AI tạo phụ đề cho video không có phụ đề

Khi video không có phụ đề phù hợp, app hiện nút "Tạo phụ đề bằng AI". Server tải âm thanh, cắt thành đoạn 10 phút, tự nhận diện ngôn ngữ và chuyển thành chữ bằng Whisper (có mốc thời gian từng câu), rồi dùng chung với mọi tính năng khác. Kết quả lưu trong thư mục `cache/` nên lần sau mở lại là có ngay.

Cần cài trên máy chạy server:

1. `yt-dlp` và `ffmpeg` (phải gọi được từ terminal).
2. Phiên âm: `pip install -r pronunciation-requirements.txt`. Gói Python hỗ trợ tiếng Trung (pypinyin), tiếng Nhật (pykakasi), tiếng Anh/Ý (gruut IPA).
3. Chọn một cách chuyển giọng nói thành chữ:
   - **Whisper chạy trên máy (miễn phí)**: `pip install faster-whisper`. Lần đầu sẽ tải model, mặc định là `small`. Đổi bằng biến `WHISPER_MODEL` (ví dụ `base` cho nhanh, `medium` cho chính xác hơn).
   - **OpenAI API**: đặt biến môi trường `OPENAI_API_KEY`. Nhanh hơn, có tính phí theo phút âm thanh. Muốn ép dùng cách này hay cách trên thì đặt `ASR=openai` hoặc `ASR=local`.

Ví dụ: `OPENAI_API_KEY=sk-... node server.js`

Video dài sẽ mất nhiều thời gian hơn. Giao diện hiện tiến độ trong lúc chờ, bạn có thể để đó và quay lại sau.

## Lưu ý

- Nhận giọng nói dùng Web Speech API, chạy tốt trên Chrome và Edge. Hỗ trợ ngôn ngữ tùy trình duyệt/hệ điều hành; nếu không nhận được tiếng Trung, hãy bật hoặc cài gói nhận dạng giọng nói tiếng Trung trong cài đặt tương ứng. Firefox không hỗ trợ.
- Micro chỉ hoạt động trên `localhost` hoặc HTTPS.
- Video cần cho phép nhúng. Nếu video có phụ đề, có thể chọn bất kỳ ngôn ngữ phụ đề nào được YouTube cung cấp. Phụ đề tự động của YouTube thường thiếu dấu câu, nên việc chia câu kém chính xác hơn.
- Lấy phụ đề và dịch đều gọi ra ngoài (YouTube, Google Translate và MyMemory làm dự phòng). Nội dung câu/từ được gửi tới dịch vụ dịch để xử lý. Phân tích câu cơ bản chạy trên máy và không gửi câu tới dịch vụ AI. Nếu đưa lên máy chủ đám mây, YouTube có thể chặn IP của máy chủ, khi đó nên chạy trên máy cá nhân hoặc thay bằng dịch vụ có API chính thức.
- Số trong câu (ví dụ "10") có thể bị chấm sai nếu máy nhận thành chữ ("ten").

## Cấu trúc

- `server.js`: lấy phụ đề, gộp câu, dịch, phục vụ file tĩnh
- `public/index.html`: giao diện và logic luyện tập
- `public/score.js`: thuật toán chấm điểm
- `transcribe.py`: chạy Whisper trên máy (faster-whisper)
- `pronounce.py`: tạo pinyin, kana/romaji và IPA cho câu/từ
- `pronunciation-requirements.txt`: thư viện phiên âm
- `cache/`: phụ đề do AI tạo, tự sinh ra khi dùng

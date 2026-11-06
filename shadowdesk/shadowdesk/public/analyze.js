(function (root) {
  const grammar = {
    en: [
      {
        pattern: /\b(?:no sooner)\s+(?:had|has|have)\s+\w+(?:ed|en|n|t)\b[^.!?]{0,80}\bthan\b|\b(?:hardly|scarcely)\s+(?:had|has|have)\s+\w+(?:ed|en|n|t)\b[^.!?]{0,80}\bwhen\b/i,
        form: 'Đảo ngữ chỉ hai việc nối tiếp rất sát nhau',
        formula: 'No sooner + trợ động từ + S + P2 + than… / Hardly/Scarcely + trợ động từ + S + P2 + when…',
        explanation: 'Đảo trợ động từ lên trước chủ ngữ để nhấn mạnh việc thứ hai xảy ra gần như ngay sau việc thứ nhất.',
        context: 'Thường kể hai sự việc trong quá khứ; dùng than với no sooner và when với hardly/scarcely.',
      },
      {
        pattern: /\b(?:refuse|refuses|refused|promise|promises|promised|decide|decides|decided|hope|hopes|hoped|plan|plans|planned|learn|learns|learned|learnt|offer|offers|offered|manage|manages|managed|agree|agrees|agreed|seem|seems|seemed|appear|appears|appeared|tend|tends|pretend|pretends|pretended|fail|fails|failed|happen|happens|happened|want|wants|wanted|need|needs|needed|choose|chooses|chose|try|tries|tried|expect|expects|expected)\s+to\s+\w+/i,
        form: 'Động từ + to-V',
        formula: 'S + verb + to + V1',
        explanation: 'To-V làm bổ ngữ cho động từ và thường nêu ý định, quyết định, mong muốn hoặc nỗ lực thực hiện hành động.',
        context: 'Một số động từ thường theo sau bởi to-V; hãy học động từ cùng dạng bổ ngữ của nó.',
      },
      {
        pattern: /\b(?:never|rarely|seldom)\s+(?:have|has|had|do|does|did|can|could|will|would|should|is|are|was|were)\s+\w+/i,
        form: 'Đảo ngữ sau trạng từ phủ định',
        formula: 'Never/Rarely/Seldom + trợ động từ + S + V',
        explanation: 'Đưa trạng từ phủ định/hạn định lên đầu câu khiến trợ động từ đứng trước chủ ngữ.',
        context: 'Cách diễn đạt nhấn mạnh, thường trang trọng hơn trật tự câu thông thường.',
      },
      {
        pattern: /\b(?:only\s+(?:after|when|if|by|then)|not\s+until)\b[^.!?]{0,100}\b(?:did|do|does|had|has|have|will|can|should|was|were)\s+\w+/i,
        form: 'Đảo ngữ sau cụm hạn định đầu câu',
        formula: 'Only/Not until + cụm/mệnh đề + trợ động từ + S + V',
        explanation: 'Khi cụm hạn định mở đầu câu, mệnh đề chính thường đảo trợ động từ và chủ ngữ.',
        context: 'Phần đứng đầu xác định điều kiện hoặc thời điểm duy nhất khiến sự việc xảy ra.',
      },
      {
        pattern: /\bunder\s+no\s+circumstances\b[^.!?]{0,60}\b(?:should|must|can|will|is|are|did|do|does)\s+\w+/i,
        form: 'Đảo ngữ với cụm phủ định đầu câu',
        formula: 'Under no circumstances + trợ động từ + S + V',
        explanation: 'Cụm phủ định được đưa lên đầu để nhấn mạnh; trợ động từ đảo lên trước chủ ngữ.',
        context: 'Thường dùng trong cảnh báo, quy định hoặc lời nhấn mạnh trang trọng.',
      },
      {
        pattern: /\bnot\s+only\s+(?:did|do|does|has|have|had|is|are|was|were|can|could|will|would|should)\s+\w+[^.!?]{0,100}\bbut\s+(?:also\s+)?/i,
        form: 'Đảo ngữ với Not only … but also',
        formula: 'Not only + trợ động từ + S + V, but (also) + mệnh đề',
        explanation: 'Đảo trợ động từ khi Not only đứng đầu; cấu trúc nối hai ý đồng loại và nhấn mạnh cả hai.',
        context: 'Giữ hai vế song song về loại từ hoặc cấu trúc để câu cân đối.',
      },
      {
        pattern: /\b(?:only\s+if|unless|provided(?:\s+that)?|as\s+long\s+as|even\s+if|suppos(?:e|ing))\b/i,
        form: 'Mệnh đề điều kiện mở rộng',
        formula: 'Từ/cụm điều kiện + mệnh đề, mệnh đề kết quả',
        explanation: 'Liên từ điều kiện cho biết điều kiện cần, ngoại lệ hoặc giả định của kết quả.',
        context: 'Unless thường tương đương “if…not”; only if nhấn mạnh điều kiện bắt buộc. Không dùng phủ định kép với unless.',
      },
      {
        pattern: /\bif\s+it\s+(?:(?:were|was)\s+not|weren't|wasn't)\s+for\b|\bif\s+it\s+had\s+not\s+been\s+for\b|\bif\s+it\s+hadn't\s+been\s+for\b/i,
        form: 'Giả định “if it were/had not been for”',
        formula: 'If it weren’t for + danh từ… / If it hadn’t been for + danh từ…',
        explanation: 'Giả định rằng một yếu tố không tồn tại; thời và dạng kết quả xác định ý đang nói về hiện tại hay quá khứ.',
        context: 'Dùng khi một người/vật/sự việc là nguyên nhân quan trọng tạo nên tình huống thực tế.',
      },
      {
        pattern: /\b(?:were\s+I|were\s+he|were\s+she|were\s+it|were\s+they|were\s+we|should\s+you|should\s+he|should\s+she|should\s+they|had\s+I|had\s+he|had\s+she|had\s+they)\b[^.!?]{0,120},/i,
        form: 'Điều kiện đảo lược bỏ if',
        formula: 'Were + S + to V… / Should + S + V… / Had + S + P2…',
        explanation: 'Trong một số giả định trang trọng, were/should/had được đưa lên đầu và if được lược bỏ.',
        context: 'Mệnh đề kết quả thường dùng would/could/might; cách đảo thay cho if trong văn phong trang trọng.',
      },
      {
        pattern: /\b(?:it\s+is\s+(?:high|about)\s+time|it's\s+(?:high|about)\s+time)\b[^.!?]{0,60}\b(?:you|he|she|they|we|i)\s+\w+(?:ed|ied|were|had)\b/i,
        form: 'Cấu trúc It is (about/high) time',
        formula: 'It is (about/high) time + S + V2',
        explanation: 'Dùng dạng quá khứ trong mệnh đề sau để nêu việc đã đến lúc nên làm ở hiện tại.',
        context: 'Thường mang sắc thái thúc giục hoặc cho rằng việc đó nên được thực hiện ngay.',
      },
      {
        pattern: /\b(?:wish|wishes|wished)\b[^.!?]{0,80}\b(?:were|had|would|could|knew|lived|was)\b/i,
        form: 'Câu ước với wish',
        formula: 'Wish + mệnh đề lùi thì / wish + would + V',
        explanation: 'Thì trong mệnh đề sau wish thay đổi theo việc người nói muốn điều gì khác ở hiện tại, quá khứ hay tương lai.',
        context: 'Wish + quá khứ thường nói điều trái hiện tại; wish + past perfect nói tiếc nuối quá khứ; wish + would nói mong sự việc đổi khác.',
      },
      {
        pattern: /\b(?:as\s+if|as\s+though)\b[^.!?]{0,80}\b(?:were|was|had|knew|lived|would|could)\b/i,
        form: 'Mệnh đề as if / as though',
        formula: 'As if/As though + mệnh đề (lùi thì khi giả định)',
        explanation: 'So sánh một tình huống với điều có vẻ đúng hoặc chỉ là giả định.',
        context: 'Thì quá khứ có thể biểu thị tính không có thật ở hiện tại; cần ngữ cảnh để phân biệt suy đoán thật với giả định.',
      },
      {
        pattern: /\b(?:it's|it\s+is)\s+(?:necessary|important|essential|vital|recommended|required)\s+that\b[^.!?]{0,70}\b(?:be|have|go|do|make|take|come|leave|attend|finish|submit|see|stay)\b/i,
        form: 'Thức giả định sau tính từ yêu cầu/thiết yếu',
        formula: 'It is + tính từ + that + S + (should) + V1',
        explanation: 'Mệnh đề that có thể dùng động từ nguyên mẫu để thể hiện yêu cầu, khuyến nghị hoặc sự cần thiết.',
        context: 'Cách dùng này trang trọng; trong Anh-Anh thường gặp should, còn Anh-Mỹ có thể dùng nguyên mẫu không chia.',
      },
      {
        pattern: /\b(?:suggest|suggests|suggested|recommend|recommends|recommended|insist|insists|insisted|demand|demands|demanded|request|requests|requested|propose|proposes|proposed)\b[^.!?]{0,60}\bthat\b[^.!?]{0,70}\b(?:be|have|go|do|make|take|come|leave|attend|finish|submit|see|stay|apologize|rest|wait|study|work|arrive)\b/i,
        form: 'Thức giả định sau động từ đề nghị/yêu cầu',
        formula: 'Suggest/Recommend/Insist + that + S + (should) + V1',
        explanation: 'Mệnh đề that nêu hành động được đề xuất hoặc yêu cầu; động từ có thể ở nguyên mẫu không chia.',
        context: 'Thường gặp trong văn phong trang trọng; chủ ngữ ngôi thứ ba vẫn không thêm -s ở dạng nguyên mẫu.',
      },
      {
        pattern: /\b(?:no\s+sooner|hardly|scarcely)\b/i,
        form: 'Cặp liên từ diễn tả hai việc nối tiếp',
        formula: 'No sooner … than … / Hardly or Scarcely … when …',
        explanation: 'Nối hai sự việc xảy ra sát nhau theo thứ tự thời gian.',
        context: 'Khi cụm này đứng đầu mệnh đề, thường dùng đảo ngữ.',
      },
      {
        pattern: /\b(?:although|though|even\s+though|whereas|while)\b/i,
        form: 'Mệnh đề nhượng bộ hoặc đối lập',
        formula: 'Although/Though/Even though + mệnh đề, mệnh đề chính',
        explanation: 'Liên từ nối một sự việc tương phản với kết quả hoặc ý kiến ở mệnh đề chính.',
        context: 'Whereas/while thường đối chiếu hai sự việc; tránh ghép although với but trong cùng cấu trúc chuẩn.',
      },
      {
        pattern: /\b(?:no\s+matter\s+(?:what|who|where|when|how)|whatever|whoever|wherever|whenever|however)\b/i,
        form: 'Mệnh đề nhượng bộ với no matter / -ever',
        formula: 'No matter + từ hỏi / từ hỏi-ever + mệnh đề, mệnh đề chính',
        explanation: 'Cho biết kết quả không thay đổi dù người, nơi, thời gian hay cách thức có khác.',
        context: 'Dùng để nhấn mạnh tính không phụ thuộc của kết quả vào điều kiện được nêu.',
      },
      {
        pattern: /\b(?:such\s+(?:a|an)\s+\w+\s+\w+|so\s+\w+)\b[^.!?]{0,90}\bthat\b/i,
        form: 'Cấu trúc kết quả so … that / such … that',
        formula: 'So + tính từ/trạng từ + that… / Such + (a/an) + cụm danh từ + that…',
        explanation: 'Nêu mức độ cao dẫn đến một kết quả.',
        context: 'So thường bổ nghĩa tính từ/trạng từ; such đi với cụm danh từ.',
      },
      {
        pattern: /\b(?:so\s+that|in\s+order\s+that)\b/i,
        form: 'Mệnh đề chỉ mục đích',
        formula: 'Mệnh đề + so that/in order that + S + can/could/will/would + V',
        explanation: 'Nêu mục đích của hành động; động từ khuyết thiếu phản ánh thời và khả năng.',
        context: 'Có thể rút gọn thành to/in order to + V khi chủ thể hai vế giống nhau.',
      },
      {
        pattern: /\b(?:what)\s+(?:i|you|he|she|it|we|they)\s+\w+[^.!?]{0,50}\b(?:is|are|was|were)\b/i,
        form: 'Mệnh đề danh từ bắt đầu bằng what',
        formula: 'What + S + V + be + thông tin được nêu',
        explanation: 'Mệnh đề what hoạt động như một cụm danh từ, thường làm chủ ngữ hoặc thành phần được nhấn mạnh.',
        context: 'Dùng để nói “điều mà/những gì”; động từ be hòa hợp với toàn bộ mệnh đề.',
      },
      {
        pattern: /\b(?:where|what|when|who|how|which)\s+to\s+\w+/i,
        form: 'Từ để hỏi + động từ nguyên mẫu có to',
        formula: 'Wh-word + to + V1',
        explanation: 'Cụm wh + to-V gói gọn một lựa chọn, chỉ dẫn hoặc điều cần biết.',
        context: 'Thường đứng sau động từ như know, decide, ask, show hoặc explain.',
      },
      {
        pattern: /\bwhether\s+to\s+\w+/i,
        form: 'Whether + to-V',
        formula: 'Whether + to + V1',
        explanation: 'Nêu việc đang cân nhắc có nên thực hiện một hành động hay không.',
        context: 'Thường theo sau động từ chỉ quyết định, hỏi hoặc cân nhắc.',
      },
      {
        pattern: /\b(?:have|has|had|get|gets|got)\s+(?:\w+\s+){1,2}(?:repaired|cleaned|fixed|painted|cut|built|checked|delivered|installed|washed|serviced|translated)\b/i,
        form: 'Cấu trúc nhờ/thuê người khác làm',
        formula: 'S + have/get + O + P2',
        explanation: 'Chủ ngữ sắp xếp để một việc được người khác thực hiện.',
        context: 'Dạng have/get + tân ngữ + phân từ nhấn vào dịch vụ/kết quả; khác have + người + V1.',
      },
      {
        pattern: /\b(?:get|gets|got|getting)\s+(?:promoted|married|injured|arrested|caught|invited|paid|selected|fired|stolen|broken)\b/i,
        form: 'Bị động với get',
        formula: 'S + get + P2',
        explanation: 'Get kết hợp với phân từ quá khứ để diễn tả một sự việc tác động đến chủ ngữ.',
        context: 'Thường nhấn mạnh sự kiện hoặc thay đổi, hay dùng trong giao tiếp; không phải mọi động từ đều tự nhiên với get.',
      },
      {
        pattern: /\bused\s+to\s+(?!be\b)\w+/i,
        form: 'Thói quen cũ với used to',
        formula: 'S + used to + V1',
        explanation: 'Dùng để nói một thói quen hoặc tình trạng từng đúng trước đây nhưng hiện không còn như vậy.',
        context: 'Sau used to là động từ nguyên mẫu; phủ định và câu hỏi thường dùng did + use to.',
      },
      {
        pattern: /\b(?:am|is|are|was|were|get|gets|got|getting)\s+(?:getting\s+)?used\s+to\s+\w+ing\b/i,
        form: 'Be/get used to + V-ing',
        formula: 'S + be/get used to + danh từ hoặc V-ing',
        explanation: 'Diễn tả việc đã quen hoặc đang dần quen với một hoạt động/tình huống.',
        context: 'To ở đây là giới từ nên theo sau bằng danh từ hoặc V-ing, không phải động từ nguyên mẫu.',
      },
      {
        pattern: /\b(?:stop|stops|stopped|stopping|remember|remembers|remembered|forget|forgets|forgot|try|tries|tried|regret|regrets|regretted)\s+(?:\w+ing|to\s+\w+)/i,
        form: 'Động từ đổi nghĩa theo V-ing hoặc to-V',
        formula: 'Verb + V-ing / Verb + to + V1',
        explanation: 'Một số động từ nhận cả V-ing và to-V nhưng ý nghĩa thay đổi theo dạng theo sau.',
        context: 'Ví dụ, stop doing là chấm dứt hoạt động; stop to do là dừng hoạt động khác để làm việc đó. Xem dạng theo sau trong câu.',
      },
      {
        pattern: /\b(?:would\s+rather|had\s+better)\s+(?:not\s+)?\w+/i,
        form: 'Would rather / had better + động từ nguyên mẫu',
        formula: 'Would rather + V1 (thích hơn); had better + V1 (nên làm)',
        explanation: 'Cụm theo sau dùng động từ nguyên mẫu không to; would rather nêu lựa chọn, had better đưa lời khuyên mạnh.',
        context: 'Phủ định thường đặt not sau cụm: would rather not / had better not.',
      },
      {
        pattern: /\b(?:it\s+is|it's|it\s+was|it\s+seems|it\s+isn't)\s+\w+\s+that\s+[^.!?]+\b/i,
        form: 'Cấu trúc đánh giá với It … that',
        formula: 'It + be/seem + tính từ + that + mệnh đề',
        explanation: 'Mệnh đề that nêu nội dung được đánh giá, nhận xét hoặc cảm xúc.',
        context: 'Một số tính từ thể hiện yêu cầu/thiết yếu có thể dùng thức giả định trong mệnh đề that.',
      },
      {
        pattern: /\b(?:there\s+is|there's)\s+no\s+\w+ing\b/i,
        form: 'There is no + V-ing',
        formula: 'There is no + V-ing',
        explanation: 'Danh động từ nêu việc không thể hoặc không có cách thực hiện.',
        context: 'Cụm này thường mang nghĩa “không thể tránh/không thể làm được việc đó”.',
      },
      {
        pattern: /\b(?:(?:it\s+is|it's)\s+(?:no\s+use|no\s+good|worth)|(?:am|is|are|was|were)\s+worth)\s+\w+ing\b|\bthere\s+is\s+no\s+point\s+in\s+\w+ing\b/i,
        form: 'Cụm đánh giá + V-ing',
        formula: 'It is no use/good/worth + V-ing; There is no point in + V-ing',
        explanation: 'V-ing gọi tên hoạt động đang được nhận xét là vô ích hoặc đáng giá.',
        context: 'Đây là các cụm cố định; sau worth/no use/no good thường dùng V-ing.',
      },
      {
        pattern: /\b(?:the\s+)?(?:first|second|third|last|only)\s+(?:person|one|student|team|thing)?\s*(?:to)\s+\w+/i,
        form: 'Số thứ tự + to-V',
        formula: 'S + be + the first/next/last + to + V1',
        explanation: 'To-V xác định hành động gắn với vị trí hoặc thứ tự của người/vật.',
        context: 'Thường gặp sau the first, the only, the next hoặc the last.',
      },
      {
        pattern: /\b(?:am|is|are|was|were)\s+(?:not\s+)?(?:likely|unlikely|eager|willing|reluctant|anxious|proud|ready|hesitant|afraid)\s+to\s+\w+/i,
        form: 'Tính từ + to-V',
        formula: 'S + be + adjective + to + V1',
        explanation: 'To-V nêu hành động gắn với trạng thái, thái độ hoặc khả năng được mô tả bởi tính từ.',
        context: 'Sắc thái phụ thuộc tính từ: sẵn sàng, miễn cưỡng, có khả năng, lo lắng hoặc tự hào.',
      },
      {
        pattern: /\b(?:am|is|are|was|were)\s+(?:interested\s+in|good\s+at|bad\s+at|afraid\s+of|tired\s+of|bored\s+with|proud\s+of|aware\s+of|capable\s+of)\s+\w+ing\b/i,
        form: 'Tính từ + giới từ + V-ing',
        formula: 'S + be + adjective + preposition + V-ing',
        explanation: 'Sau tính từ kèm giới từ, hoạt động thường được diễn đạt bằng danh động từ.',
        context: 'Giới từ quyết định cấu trúc theo sau; không đổi V-ing thành to-V tùy ý.',
      },
      {
        pattern: /\b(?:need|needs|needed|require|requires|requires)\s+\w+ing\b/i,
        form: 'Need/require + V-ing',
        formula: 'S + need/require + V-ing (nghĩa bị động)',
        explanation: 'Chủ ngữ là đối tượng cần được tác động; cấu trúc này thường tương đương need to be + P2.',
        context: 'Ví dụ “The car needs washing” nghĩa là xe cần được rửa, không phải chiếc xe tự rửa.',
      },
      {
        pattern: /\b(?:be|am|is|are|was|were)\s+made\s+to\s+\w+|\b(?:make|made)\s+\w+\s+\w+/i,
        form: 'Make + tân ngữ + động từ / dạng bị động',
        formula: 'Chủ động: make + O + V1; bị động: be made + to-V',
        explanation: 'Make có thể diễn tả việc khiến/bắt ai làm; dạng bị động đưa to trở lại trước động từ.',
        context: 'Phân biệt chủ động không to với bị động có to.',
      },
      {
        pattern: /\b(?:be|am|is|are|was|were)\s+(?:allowed|asked|told|expected|required|encouraged|advised|invited|forced)\s+to\s+\w+/i,
        form: 'Bị động + to-V',
        formula: 'S + be + P2 + to + V1',
        explanation: 'Chủ ngữ nhận yêu cầu, cho phép, kỳ vọng hoặc tác động để thực hiện hành động.',
        context: 'Thường tương ứng với câu chủ động có tân ngữ + to-V.',
      },
      {
        pattern: /\b(?:am|is|are|was|were)\s+(?:said|reported|thought|believed|known|considered)\s+to\s+(?:have\s+)?\w+(?:ed|en|n|t)\b/i,
        form: 'Bị động tường thuật + to-V',
        formula: 'S + be + said/reported/believed + to-V (hoặc to have + P2)',
        explanation: 'Dùng bị động để thuật lại nhận định hoặc thông tin được nhiều người cho là đúng.',
        context: 'To have + P2 cho biết hành động được thuật lại xảy ra trước thời điểm của động từ tường thuật.',
      },
      {
        pattern: /\b(?:have|has|had)\s+no\s+choice\s+but\s+to\s+\w+/i,
        form: 'Have no choice but to-V',
        formula: 'S + have no choice but to + V1',
        explanation: 'Nêu tình huống người nói chỉ còn một hành động khả thi.',
        context: 'But ở đây mang nghĩa “ngoài/ngoại trừ”, theo sau là to-V.',
      },
      {
        pattern: /\b(?:prevent|stopped?|keep|discourage)\s+\w+\s+from\s+\w+ing\b/i,
        form: 'Ngăn cản + tân ngữ + from + V-ing',
        formula: 'S + prevent/stop/keep + O + from + V-ing',
        explanation: 'Mô tả việc ngăn một người hoặc vật thực hiện hành động.',
        context: 'From là giới từ, vì vậy động từ theo sau dùng V-ing.',
      },
      {
        pattern: /\b(?:succeed|succeeded|succeeds|insist|insisted|insists|accuse|accused|accuses)\s+(?:in|on|of)\s+\w+ing\b/i,
        form: 'Động từ + giới từ + V-ing',
        formula: 'S + verb + in/on/of + V-ing',
        explanation: 'Một số động từ kết hợp với giới từ cố định trước danh động từ.',
        context: 'Ghi nhớ cả cụm động từ và giới từ, không chỉ riêng động từ chính.',
      },
      {
        pattern: /\b(?:a\s+lot\s+of|enough|plenty\s+of|too\s+many|too\s+much)\s+\w+[^.!?]{0,40}\bto\s+\w+/i,
        form: 'Lượng từ + danh từ + to-V',
        formula: 'S + have + enough/plenty of + N + to + V1',
        explanation: 'Danh từ chỉ lượng/nguồn lực đi cùng to-V để nói khả năng hoặc điều kiện thực hiện hành động.',
        context: 'Enough đứng trước danh từ đếm được hoặc không đếm được; vị trí khác khi enough bổ nghĩa tính từ.',
      },
      {
        pattern: /\b(?:not\s+only|neither|so)\b[^.!?]{0,80}\b(?:am|is|are|was|were|do|does|did|have|has|had|can|could|will|would|should)\s+\w+/i,
        form: 'Đảo ngữ nhấn mạnh / đồng tình',
        formula: 'Từ/cụm nhấn mạnh đầu câu + trợ động từ + S + V',
        explanation: 'Một số từ phủ định hoặc nhấn mạnh ở đầu câu kéo theo đảo trợ động từ và chủ ngữ.',
        context: 'Xác định từ mở đầu và quan hệ giữa hai mệnh đề để chọn trợ động từ phù hợp.',
      },
      {
        pattern: /\b(?:look\s+forward\s+to|be\s+interested\s+in|be\s+good\s+at|be\s+bad\s+at|be\s+afraid\s+of|be\s+tired\s+of|be\s+busy|be\s+used\s+to|get\s+used\s+to|be\s+worth|insist\s+on|succeed\s+in|capable\s+of|difficulty\s+(?:in\s+)?|committed\s+to|on\s+the\s+verge\s+of|with\s+a\s+view\s+to)\s+\w+ing\b/i,
        form: 'Cụm từ cố định + V-ing',
        formula: 'Cụm động từ/tính từ/giới từ + V-ing',
        explanation: 'V-ing đứng sau cụm có giới từ hoặc một số kết hợp cố định; to trong look forward to/be used to là giới từ.',
        context: 'Nhận diện cụm từ trong câu giúp phân biệt giới từ to với dấu hiệu động từ nguyên mẫu to-V.',
      },
      {
        pattern: /\b(?:avoid|avoids|avoided|enjoy|enjoys|enjoyed|admit|admits|admitted|deny|denies|denied|consider|considers|considered|mind|minds|minded|keep|keeps|kept|finish|finishes|finished|risk|risks|risked|delay|delays|delayed|postpone|postpones|postponed|suggest|suggests|suggested|imagine|imagines|imagined|practice|practices|practiced|miss|misses|missed|quit|quits|recommend|recommends|recommended|stop|stops|stopped|stopping)\s+\w+ing\b/i,
        form: 'Động từ theo sau bởi V-ing',
        formula: 'S + verb + V-ing',
        explanation: 'Một số động từ thường nhận danh động từ làm bổ ngữ.',
        context: 'Dạng V-ing ở đây đóng vai trò bổ ngữ cho động từ trước; không tự thêm to.',
      },
      {
        pattern: /\b(?:ask|asks|asked|tell|tells|told|want|wants|wanted|allow|allows|allowed|advise|advises|advised|remind|reminds|reminded|invite|invites|invited|encourage|encourages|encouraged|expect|expects|expected|force|forces|forced|persuade|persuades|persuaded|order|orders|ordered|warn|warns|warned|need|needs|needed|would\s+like)\s+\w+\s+to\s+\w+/i,
        form: 'Động từ + tân ngữ + to-V',
        formula: 'S + verb + O + to + V1',
        explanation: 'Tân ngữ là người thực hiện hành động nguyên mẫu có to.',
        context: 'Thường gặp sau ask, tell, want, allow, advise và các động từ yêu cầu/khuyên/bảo.',
      },
      {
        pattern: /\b(?:let|lets|let's|make|makes|made|help|helps|helped)\s+\w+\s+(?:\w+|to\s+\w+)/i,
        form: 'Cấu trúc sai khiến với let / make / help',
        formula: 'Let/Make + O + V1; Help + O + (to) V1',
        explanation: 'Những động từ này kết hợp với tân ngữ và động từ chỉ hành động; dạng nguyên mẫu thường không có to sau let/make.',
        context: 'Ở bị động với make, to thường xuất hiện trước động từ nguyên mẫu.',
      },
      {
        pattern: /\b(?:too\s+\w+\s+to\s+\w+|\w+\s+enough\s+to\s+\w+|enough\s+\w+\s+to\s+\w+)\b/i,
        form: 'Cấu trúc too / enough + to-V',
        formula: 'Too + adj/adv + to-V; adj/adv + enough + to-V; enough + N + to-V',
        explanation: 'Too nêu mức độ vượt quá khả năng; enough cho biết điều kiện hoặc mức độ đã đủ.',
        context: 'Vị trí enough khác nhau: sau tính từ/trạng từ nhưng trước danh từ.',
      },
      {
        pattern: /\b(?:it\s+takes?|it\s+took)\s+\w+\s+[^.!?]{1,40}\bto\s+\w+/i,
        form: 'Cấu trúc It takes + thời gian + to-V',
        formula: 'It takes/took + người + khoảng thời gian + to-V',
        explanation: 'Nêu thời gian cần thiết để một người hoàn thành hành động.',
        context: 'Đổi takes/took theo thời; tân ngữ người có thể được lược nếu không cần nêu.',
      },
      {
        pattern: /\b(?:spend|spends|spent|waste|wastes|wasted)\s+(?:\w+\s+)?(?:time|hours?|minutes?|money|days?|weeks?|months?|years?)\s+\w+ing\b/i,
        form: 'Spend/waste + thời gian hoặc tiền + V-ing',
        formula: 'S + spend/waste + khoảng thời gian/tiền + V-ing',
        explanation: 'Mô tả thời gian hoặc tiền được dùng/lãng phí cho một hoạt động.',
        context: 'Theo sau khoảng thời gian/tiền là V-ing; có thể thêm on + danh từ.',
      },
      {
        pattern: /\b(?:would\s+rather|would\s+prefer)\b[^.!?]{0,80}\bthan\b|\bprefer(?:s|red)?\s+(?:to\s+)?\w+ing\s+to\s+\w+ing\b/i,
        form: 'Cấu trúc lựa chọn/prefer',
        formula: 'Would rather + V1 + than + V1 / Prefer + V-ing + to + V-ing',
        explanation: 'So sánh hai lựa chọn và nêu lựa chọn được ưu tiên.',
        context: 'Giữ dạng hai vế song song; to sau prefer + V-ing là giới từ, khác to-V.',
      },
      {
        pattern: /\b(?:although|though|even\s+though)\b|\b(?:because|since|as)\b[^.!?]{1,80},/i,
        form: 'Mệnh đề phụ chỉ nhượng bộ hoặc nguyên nhân',
        formula: 'Liên từ + S + V, mệnh đề chính',
        explanation: 'Mệnh đề phụ nêu nguyên nhân hoặc thông tin tương phản với mệnh đề chính.',
        context: 'Cần phân biệt because (nguyên nhân) với although/even though (nhượng bộ).',
      },
      {
        pattern: /\bif\b[^.!?]{0,100}\bhad\s+\w+(?:ed|en|n|t)\b[^.!?]{0,80}\bwould\s+have\s+\w+(?:ed|en|n|t)\b/i,
        form: 'Câu điều kiện loại 3',
        formula: 'If + S + had + P2, S + would have + P2',
        explanation: 'Diễn tả một điều kiện trái với thực tế trong quá khứ và kết quả đã không xảy ra.',
        context: 'Dùng để nói về tiếc nuối hoặc suy đoán quá khứ; có thể thay would bằng could/might tùy ý nghĩa.',
      },
      {
        pattern: /\bif\b[^.!?]{0,80}\b(?:would|could|might)\s+\w+/i,
        form: 'Câu điều kiện loại 2',
        formula: 'If + S + V2/were, S + would/could/might + V1',
        explanation: 'Giả định tình huống hiện tại hoặc tương lai khó có thật; mệnh đề if dùng dạng quá khứ nhưng không nhất thiết nói về quá khứ.',
        context: 'Dùng để nêu giả định, lời khuyên hoặc hệ quả tưởng tượng.',
      },
      {
        pattern: /\bif\b[^.!?]{0,80}\b(?:will|can|may|might)\s+\w+/i,
        form: 'Câu điều kiện loại 1',
        formula: 'If + S + hiện tại đơn, S + will/can/may + V1',
        explanation: 'Nêu điều kiện có khả năng xảy ra và kết quả có thể xảy ra trong tương lai.',
        context: 'Mệnh đề if thường dùng hiện tại đơn; không đặt will trong mệnh đề if thông thường.',
      },
      {
        pattern: /\bif\b[^.!?]{0,70}\b(?:is|are|do|does|have|has)\b[^.!?]{0,70},\s*[^.!?]*\b(?:is|are|do|does|always|usually)\b/i,
        form: 'Câu điều kiện loại 0',
        formula: 'If + S + hiện tại đơn, S + hiện tại đơn',
        explanation: 'Hai mệnh đề ở hiện tại đơn diễn tả quy luật, sự thật chung hoặc kết quả lặp lại.',
        context: 'Dùng khi kết quả đúng nói chung mỗi khi điều kiện được đáp ứng.',
      },
      {
        pattern: /\b(?:have|has)\s+been\s+\w+ing\b/i,
        form: 'Hiện tại hoàn thành tiếp diễn',
        formula: 'S + have/has + been + V-ing',
        explanation: 'Nhấn mạnh một hoạt động bắt đầu trước đây và còn tiếp diễn hoặc vừa mới dừng; thường đi với for/since.',
        context: 'Thường nhấn mạnh quá trình hoặc khoảng thời gian hơn kết quả hoàn tất.',
      },
      {
        pattern: /\b(?:had)\s+been\s+\w+ing\b/i,
        form: 'Quá khứ hoàn thành tiếp diễn',
        formula: 'S + had + been + V-ing',
        explanation: 'Nhấn mạnh hoạt động kéo dài trước một mốc hoặc một sự kiện khác trong quá khứ.',
        context: 'Thường xuất hiện cùng một mốc quá khứ hoặc mệnh đề when/before/by the time.',
      },
      {
        pattern: /\b(?:had)\s+(?:\w+ed|been|done|gone|known|made|seen|taken|written|read|left|lost|felt|found|bought|brought|thought|taught|said|paid|put|cut|won|held|sold)\b/i,
        form: 'Quá khứ hoàn thành',
        formula: 'S + had + P2',
        explanation: 'Đánh dấu việc đã hoàn thành trước một thời điểm hay sự kiện khác trong quá khứ.',
        context: 'Thường dùng để làm rõ thứ tự trước-sau giữa hai sự việc quá khứ.',
      },
      {
        pattern: /\b(?:have|has)\s+(?:\w+ed|been|done|gone|known|made|seen|taken|written|read|left|lost|felt|found|bought|brought|thought|taught|said|paid|put|cut|won|held|sold)\b/i,
        form: 'Hiện tại hoàn thành',
        formula: 'S + have/has + P2',
        explanation: 'Nối trải nghiệm, kết quả hoặc tình huống bắt đầu trong quá khứ với hiện tại.',
        context: 'Hay gặp với ever, never, just, already, yet, for và since; thường không dùng với mốc quá khứ đã kết thúc như yesterday.',
      },
      {
        pattern: /\b(?:was|were)\s+\w+ing\b/i,
        form: 'Quá khứ tiếp diễn',
        formula: 'S + was/were + V-ing',
        explanation: 'Diễn tả hoạt động đang diễn ra tại một thời điểm trong quá khứ.',
        context: 'Thường dùng làm bối cảnh cho một hành động khác xen vào, ví dụ với when/while.',
      },
      {
        pattern: /\b(?:am|is|are)\s+\w+ing\b/i,
        form: 'Hiện tại tiếp diễn',
        formula: 'S + am/is/are + V-ing',
        explanation: 'Diễn tả hoạt động đang diễn ra hoặc tình huống tạm thời quanh hiện tại.',
        context: 'Thường đi với now, right now, at the moment, today hoặc this week; cũng có thể nói về kế hoạch gần.',
      },
      {
        pattern: /\b(?:did\s+not|didn't|did\s+[\w'-]+\s+)\w+|\b(?:yesterday|last\s+(?:week|month|year|night)|\d+\s+(?:day|week|month|year)s?\s+ago)\b/i,
        form: 'Quá khứ đơn',
        formula: 'Khẳng định: S + V2; phủ định: S + did not + V1; câu hỏi: Did + S + V1?',
        explanation: 'Kể hành động đã xảy ra và kết thúc trong quá khứ.',
        context: 'Thường có mốc như yesterday, last week hoặc ago. Sau did/did not, động từ chính dùng nguyên mẫu.',
      },
      {
        pattern: /\b(?:went|ate|saw|came|did|had|made|took|got|gave|wrote|ran|met|knew|thought|found|left|felt|kept|slept|read|said|bought|brought|told|became|began|broke|chose|drove|drank|forgot|heard|held|lost|paid|put|sat|sold|sent|stood|understood|won|built)\b/i,
        form: 'Quá khứ đơn',
        formula: 'Khẳng định: S + V2; phủ định: S + did not + V1; câu hỏi: Did + S + V1?',
        explanation: 'Động từ bất quy tắc ở dạng quá khứ cho biết hành động đã xảy ra.',
        context: 'Dùng khi kể sự việc đã kết thúc trong quá khứ; có thể có hoặc không nêu mốc thời gian cụ thể.',
      },
      {
        pattern: /\b(?:am|is|are|was|were)\s+(?:being\s+)?(?:\w+ed|built|bought|brought|done|eaten|given|known|made|seen|sent|spoken|taken|told|written)\b/i,
        form: 'Câu bị động',
        formula: 'S + be (đúng thì) + P2 (+ by + tác nhân)',
        explanation: 'Đưa đối tượng chịu tác động lên làm chủ ngữ; tác nhân có thể nêu sau by hoặc lược bỏ.',
        context: 'Dùng khi muốn nhấn mạnh đối tượng/kết quả, hoặc khi người thực hiện không rõ hay không quan trọng.',
      },
      {
        pattern: /\b(?:there)\s+(?:is|are|was|were)\b/i,
        form: 'Cấu trúc there is / there are',
        formula: 'There + be + danh từ; is/was thường đi với số ít, are/were với số nhiều',
        explanation: 'Dùng there + be để giới thiệu sự tồn tại hoặc sự xuất hiện của người/vật.',
        context: 'Chọn dạng be theo danh từ theo sau, không theo từ there.',
      },
      {
        pattern: /\b(?:am|is|are|was|were)\s+(?:going\s+to)\s+\w+/i,
        form: 'Tương lai gần với be going to',
        formula: 'S + am/is/are + going to + V1',
        explanation: 'Diễn tả dự định đã có hoặc dự đoán dựa trên dấu hiệu hiện tại.',
        context: 'Dùng be phù hợp chủ ngữ; động từ sau going to ở nguyên mẫu.',
      },
      {
        pattern: /\b(?:will|won't|shall)\s+\w+/i,
        form: 'Tương lai với will',
        formula: 'S + will/won’t + V1',
        explanation: 'Diễn tả dự đoán, lời hứa, đề nghị hoặc quyết định về tương lai.',
        context: 'Sau will/won’t dùng động từ nguyên mẫu không to.',
      },
      {
        pattern: /\b(?:do|does)\s+not\b|\b(?:don't|doesn't)\b|\b(?:do|does)\s+\w+\s+\w+/i,
        form: 'Hiện tại đơn với do / does',
        formula: 'Phủ định: S + do/does not + V1; câu hỏi: Do/Does + S + V1?',
        explanation: 'Do/does trợ giúp tạo câu phủ định hoặc câu hỏi ở hiện tại đơn; does đi với he/she/it.',
        context: 'Động từ chính giữ nguyên mẫu sau do/does, kể cả chủ ngữ ngôi thứ ba số ít.',
      },
      {
        pattern: /\b(?:every\s+(?:day|week|month|year|morning|night)|often|usually|always|sometimes|rarely|seldom|never)\b/i,
        form: 'Hiện tại đơn (thói quen/tần suất)',
        formula: 'S + V1 (he/she/it + V-s/es)',
        explanation: 'Diễn tả thói quen, hành động lặp lại hoặc tình huống thường đúng.',
        context: 'Các dấu hiệu thường gặp gồm every day, usually, often, sometimes và never.',
      },
      {
        pattern: /\b(?:more|less)\s+\w+\s+than\b|\b\w{3,}er\s+than\b/i,
        form: 'So sánh hơn',
        formula: 'Tính từ ngắn + -er + than / more or less + tính từ + than',
        explanation: 'So sánh mức độ của hai người, vật hoặc tình huống.',
        context: 'Dạng từ phụ thuộc tính từ; một số tính từ có dạng bất quy tắc như good → better.',
      },
      {
        pattern: /\b(?:the\s+)?(?:most|least)\s+\w+\b|\bthe\s+\w{3,}est\b/i,
        form: 'So sánh nhất',
        formula: 'the + tính từ ngắn + -est / the most or least + tính từ',
        explanation: 'Nêu đối tượng có mức độ cao nhất hoặc thấp nhất trong một nhóm.',
        context: 'Thường dùng the; cần xác định nhóm so sánh từ ngữ cảnh.',
      },
      {
        pattern: /\bas\s+\w+\s+as\b/i,
        form: 'So sánh bằng as … as',
        formula: 'as + tính từ/trạng từ + as',
        explanation: 'Diễn tả hai đối tượng ngang bằng về một đặc điểm; not as … as diễn tả kém bằng.',
        context: 'Từ ở giữa as thường là tính từ hoặc trạng từ tùy vai trò trong câu.',
      },
      {
        pattern: /\b(?:who|which|that)\b[^.!?]{2,80}\b(?:is|are|was|were|has|have|do|does|did|can|will)\b/i,
        form: 'Mệnh đề quan hệ',
        formula: 'Danh từ + who (người) / which (vật) / that + mệnh đề',
        explanation: 'Mệnh đề quan hệ bổ sung thông tin cho danh từ đứng trước.',
        context: 'Who thường thay cho người, which cho vật; that có thể thay trong một số mệnh đề xác định.',
      },
      {
        pattern: /\b(?:must|should|can|could|may|might|would|will|shall)\s+(?:not\s+)?\w+/i,
        form: 'Động từ khuyết thiếu',
        formula: 'S + modal (+ not) + V1',
        explanation: 'Modal kết hợp với động từ nguyên mẫu để diễn tả khả năng, lời khuyên, nghĩa vụ, cho phép hoặc dự đoán.',
        context: 'Modal không chia theo ngôi; động từ theo sau thường không có to.',
      },
      {
        pattern: /\b(?:have|has|had)\s+to\s+\w+/i,
        form: 'Nghĩa vụ với have to',
        formula: 'S + have/has/had to + V1',
        explanation: 'Diễn tả sự cần thiết hoặc nghĩa vụ; have thay đổi theo chủ ngữ và thì.',
        context: 'Have to thường nhấn mạnh yêu cầu/quy định; dạng phủ định không đồng nghĩa với mustn’t.',
      },
      {
        pattern: /\bwould\s+you\s+like\b/i,
        form: 'Lời mời/lời đề nghị với Would you like…?',
        formula: 'Would you like + danh từ / to + V1?',
        explanation: 'Cách mời hoặc đề nghị lịch sự.',
        context: 'Dùng danh từ khi đề nghị một món/vật; dùng to + động từ khi mời làm việc gì.',
      },
      {
        pattern: /\b(?:wish|wishes|wished)\b[^.!?]{0,80}\b(?:were|had|would|could|knew|lived|was)\b/i,
        form: 'Câu ước với wish',
        formula: 'S + wish(es) + mệnh đề lùi thì',
        explanation: 'Mệnh đề sau wish thường lùi thì để diễn tả điều trái với hiện tại, quá khứ hoặc mong muốn thay đổi.',
        context: 'Dạng sau wish phụ thuộc thời điểm và ý nghĩa; mẫu này chỉ nhận diện sơ bộ, cần xem ngữ cảnh để phân biệt.',
      },
      {
        pattern: /\b(?:said|told|asked)\b[^.!?]{0,80}\b(?:that|if|whether)\b/i,
        form: 'Câu tường thuật',
        formula: 'S + said/told/asked + (that/if/whether) + mệnh đề',
        explanation: 'Thuật lại lời nói hoặc câu hỏi; đại từ và thì có thể thay đổi theo người nói và thời điểm tường thuật.',
        context: 'That có thể được lược trong lời kể; câu hỏi Yes/No thường dùng if hoặc whether.',
      },
      {
        pattern: /\b(?:please\s+)?(?:don't|do\s+not)\s+\w+|\bplease\s+\w+/i,
        form: 'Câu mệnh lệnh',
        formula: '(Please) + V1 / Don’t + V1',
        explanation: 'Dùng động từ nguyên mẫu để yêu cầu, hướng dẫn hoặc khuyên; thêm please để lịch sự hơn.',
        context: 'Chủ ngữ you thường được lược bỏ.',
      },
      {
        pattern: /\b(?:this|that|these|those)\s+(?:am|is|are)\b/i,
        form: 'Đại từ chỉ định + động từ be',
        explanation: 'This/that dùng với danh từ hoặc sự vật số ít; these/those dùng với số nhiều. Ở hiện tại, this/that đi với is và these/those đi với are.',
        context: 'Dùng để xác định hoặc giới thiệu người/vật. This/these thường chỉ vật gần người nói; that/those thường chỉ vật xa hơn hoặc đã được nhắc đến.',
      },
    ],
    zh: [
      {
        pattern: /因为.{1,60}所以/,
        form: '因果: 因为……所以……',
        level: 'HSK 2',
        formula: '因为 + nguyên nhân，所以 + kết quả',
        explanation: '“因为” nêu nguyên nhân, “所以” nêu kết quả.',
        context: 'Dùng để giải thích nguyên nhân và kết quả một cách rõ ràng; trong khẩu ngữ có thể lược một trong hai vế.',
      },
      {
        pattern: /虽然.{1,60}但是/,
        form: 'Nhượng bộ: 虽然……但是……',
        level: 'HSK 3',
        formula: '虽然 + ý nhượng bộ，但是 + ý tương phản',
        explanation: 'Vế “虽然” nêu điều trái kỳ vọng, còn “但是” đưa ra ý đối lập.',
        context: 'Dùng khi muốn thừa nhận một sự thật nhưng nhấn mạnh kết quả/quan điểm trái ngược.',
      },
      {
        pattern: /如果.{1,60}(就|那么)/,
        form: 'Điều kiện: 如果……就……',
        level: 'HSK 3',
        formula: '如果 + điều kiện，就 + kết quả',
        explanation: '“如果” mở đầu điều kiện; “就/那么” dẫn tới kết quả.',
        context: 'Dùng cho tình huống giả định hoặc điều kiện có thể xảy ra.',
      },
      {
        pattern: /不但.{1,60}(而且|还)/,
        form: 'Bổ sung tăng tiến: 不但……而且/还……',
        level: 'HSK 4',
        formula: '不但 + ý 1，而且/还 + ý bổ sung',
        explanation: 'Nêu một đặc điểm rồi bổ sung ý thứ hai mạnh hơn hoặc đáng chú ý hơn.',
        context: 'Dùng để nhấn mạnh một người/vật có từ hai đặc điểm trở lên.',
      },
      {
        pattern: /一边.{1,60}一边/,
        form: 'Hai hành động đồng thời: 一边……一边……',
        level: 'HSK 3',
        formula: '一边 + hành động 1，一边 + hành động 2',
        explanation: 'Hai vế mô tả các hành động diễn ra cùng lúc, thường cùng một chủ thể.',
        context: 'Dùng để kể hai việc được làm đồng thời.',
      },
      {
        pattern: /(?<!不)(?<!而)是[^，。！？]{1,20}(?:在|买|去|做|来|跟|坐|用|从|给|学|工作|认识|吃|看|住|告诉)[^，。！？]{0,10}的/,
        form: 'Cấu trúc nhấn mạnh 是……的',
        level: 'HSK 3',
        formula: 'S + 是 + thông tin được nhấn mạnh + V + 的',
        explanation: 'Thường làm nổi bật thời gian, địa điểm, cách thức hoặc người thực hiện một việc đã xảy ra.',
        context: 'Dùng khi sự việc đã biết/đã xảy ra và người nói muốn làm rõ một chi tiết. Cần xem cả câu để phân biệt với “的” bổ nghĩa danh từ.',
      },
      {
        pattern: /(正在|在).{1,40}(呢|$)/,
        form: 'Hành động đang diễn ra: 正在/在……(呢)',
        level: 'HSK 1',
        formula: 'S + 正在/在 + V + (呢)',
        explanation: '“正在/在” đánh dấu hành động đang tiếp diễn; “呢” có thể nhấn mạnh trạng thái hiện tại.',
        context: 'Dùng để trả lời đang làm gì hoặc miêu tả việc xảy ra ngay lúc nói.',
      },
      {
        pattern: /了/,
        form: 'Trợ từ 了',
        level: 'HSK 1',
        explanation: '“了” có thể đánh dấu việc hoàn tất hoặc một trạng thái mới; nghĩa cụ thể phụ thuộc vị trí và ngữ cảnh.',
        context: 'Thường gặp khi nói một việc đã hoàn thành hoặc tình hình vừa thay đổi. Không phải lúc nào cũng tương đương thì quá khứ.',
      },
      {
        pattern: /(?:吗[？?。！!]?|是不是|有没有|能不能|可不可以)[？?。！!]?$/,
        form: 'Câu hỏi đóng: 吗 / câu hỏi A-not-A',
        level: 'HSK 1',
        formula: 'Câu trần thuật + 吗？ / V + 不 + V？',
        explanation: '“吗” biến câu trần thuật thành câu hỏi có/không; dạng A-not-A lặp động từ hoặc tính từ ở dạng khẳng định và phủ định.',
        context: 'Dùng để hỏi xác nhận hoặc khả năng. Không dùng “吗” sau câu hỏi A-not-A.',
      },
      {
        pattern: /(?:呢[？?。！!]?|(?:我|你|他|她|它|我们|你们|他们).{0,12}呢)[？?。！!]?$/,
        form: 'Hỏi tiếp hoặc nêu chủ đề với 呢',
        level: 'HSK 1',
        formula: 'Chủ đề + 呢？ / S + 在 + địa điểm + 呢',
        explanation: '“呢” thường dùng trong câu hỏi tiếp nối như “còn… thì sao?” hoặc nhấn mạnh trạng thái đang diễn ra.',
        context: 'Ý nghĩa phụ thuộc câu trước và vị trí của “呢”; không nên dịch máy móc thành một từ cố định.',
      },
      {
        pattern: /(?:^|[，。！？])[^，。！？]{0,20}(?:是)[^，。！？]{1,24}(?:[，。！？]|$)/,
        form: 'Câu nhận định khẳng định/phủ định với 是',
        level: 'HSK 1',
        formula: 'Chủ ngữ + 是 + danh từ/cụm danh từ',
        explanation: '“是” nối chủ ngữ với danh từ dùng để xác định hoặc phân loại; câu phủ định thường dùng “不是”.',
        context: 'Dùng để nói ai/cái gì là ai/cái gì. Tính từ vị ngữ thường không cần “是”.',
      },
      {
        pattern: /(?:很|不(?!是|在|有|要|能|会|想|用)|太|真|非常|比较)(?:不)?(?:好|坏|大|小|高|低|多|少|快|慢|热|冷|忙|累|难|容易|远|近|贵|便宜|新|旧|长|短|漂亮|高兴|快乐|方便|重要|认真|有趣|有意思)(?:吗|呢|了|。|！|？|，|$)/,
        form: 'Tính từ làm vị ngữ',
        level: 'HSK 1',
        formula: 'Chủ ngữ + (很/不/太) + tính từ',
        explanation: 'Trong tiếng Trung, tính từ có thể trực tiếp làm vị ngữ; “很” thường làm câu tự nhiên và không nhất thiết mang nghĩa nhấn mạnh “rất”.',
        context: 'Dùng để miêu tả đặc điểm hoặc trạng thái. Phủ định tính từ thường dùng “不”.',
      },
      {
        pattern: /(?:我的|你的|他的|她的|它的|我们的|你们的|他们的|[\u3400-\u9fff]{1,4}的)[\u3400-\u9fff]{1,5}/,
        form: 'Cụm định ngữ với 的',
        level: 'HSK 1',
        formula: 'Người sở hữu / cụm miêu tả + 的 + danh từ',
        explanation: '“的” nối thành phần sở hữu hoặc miêu tả với danh từ đứng sau; với quan hệ thân thuộc gần gũi, đôi khi có thể lược bỏ.',
        context: 'Dùng để nói sở hữu hoặc bổ nghĩa cho danh từ; cần xét quan hệ giữa hai danh từ để biết có thể bỏ “的” hay không.',
      },
      {
        pattern: /(?:\d+|[一二两三四五六七八九十几])(?:个|本|杯|张|只|件|位|条|辆|台|家)[\u3400-\u9fff]+/,
        form: 'Số từ + lượng từ + danh từ',
        level: 'HSK 1',
        formula: 'Số từ + lượng từ + danh từ',
        explanation: 'Lượng từ đứng giữa số từ và danh từ để phân loại hoặc đếm sự vật.',
        context: 'Dùng với số lượng cụ thể; lựa chọn lượng từ phụ thuộc loại danh từ, còn “个” là lượng từ phổ biến nhưng không thay được mọi lượng từ.',
      },
      {
        pattern: /(?:在[\u3400-\u9fff]{1,8}(?:吗|呢|。|！|？|，|$)|[\u3400-\u9fff]{1,8}有[\u3400-\u9fff]{1,12})/,
        form: 'Nói vị trí với 在 / sự tồn tại với 有',
        level: 'HSK 1',
        formula: 'S + 在 + địa điểm / địa điểm + 有 + người-vật',
        explanation: '“在” thường nêu vị trí của chủ thể; “有” có thể giới thiệu người/vật tồn tại ở một nơi.',
        context: 'Chú ý thứ tự thông tin: “我在家” là tôi ở nhà; “家里有一只猫” là trong nhà có một con mèo.',
      },
      {
        pattern: /(?:比[\u3400-\u9fff]{1,8}(?:更|还)?[\u3400-\u9fff]{1,5}|没有[\u3400-\u9fff]{1,8}(?:这么|那么)?[\u3400-\u9fff]{1,5})/,
        form: 'So sánh với 比 / 没有',
        level: 'HSK 2',
        formula: 'A + 比 + B + tính từ / A + 没有 + B + 这么/那么 + tính từ',
        explanation: '“比” nêu đối tượng so sánh; “没有……这么/那么……” nói A không đạt mức độ như B.',
        context: 'Dùng để so sánh mức độ. Không đặt “很” ngay trước tính từ trong cấu trúc 比 cơ bản.',
      },
      {
        pattern: /[\u3400-\u9fff]{1,8}过[\u3400-\u9fff]{0,8}(?:吗|没有|了|。|！|？|，|$)/,
        form: 'Trải nghiệm với 过',
        level: 'HSK 2',
        formula: 'S + V + 过 + (O)',
        explanation: '“过” sau động từ biểu thị người nói từng có trải nghiệm đó; câu phủ định thường dùng “没(有)”.',
        context: 'Dùng để hỏi hoặc kể kinh nghiệm trong đời, không tập trung vào thời điểm hay kết quả cụ thể.',
      },
      {
        pattern: /[\u3400-\u9fff]{1,5}得(?:很|非常|不太|比较|特别)?[\u3400-\u9fff]{1,5}(?:吗|呢|了|。|！|？|，|$)/,
        form: 'Bổ ngữ mức độ với 得',
        level: 'HSK 2',
        formula: 'Động từ + 得 + mức độ/tính từ',
        explanation: '“得” nối động từ với phần mô tả mức độ hoặc cách thức của hành động.',
        context: 'Dùng để đánh giá hành động; nếu động từ có tân ngữ, thường cần lặp lại động từ hoặc đổi trật tự câu.',
      },
      {
        pattern: /(?:听|看|做|写|说|买|找|吃|喝|学|记|读|睡|拿|关|开|洗|走|听)[\u3400-\u9fff]{0,3}(?:到|懂|见|完|好|错|清楚|明白|开|住|起)(?:了|吗|没有|。|！|？|，|$)/,
        form: 'Bổ ngữ kết quả',
        level: 'HSK 2',
        formula: 'Động từ + bổ ngữ kết quả (到/懂/见/完/好…)',
        explanation: 'Bổ ngữ đứng sau động từ cho biết hành động đạt được kết quả gì.',
        context: 'Dùng để nêu kết quả hoàn thành, nhận biết hoặc thay đổi do hành động tạo ra.',
      },
      {
        pattern: /(?:先[\u3400-\u9fff]{1,20}(?:再|然后)|再[\u3400-\u9fff]{1,20}然后)/,
        form: 'Trình tự hành động: 先……再/然后……',
        level: 'HSK 2',
        formula: '先 + hành động 1，再/然后 + hành động 2',
        explanation: '“先” đánh dấu việc làm trước; “再/然后” dẫn đến bước tiếp theo.',
        context: 'Dùng để hướng dẫn hoặc kể chuỗi hành động theo thứ tự.',
      },
      {
        pattern: /越来越[\u3400-\u9fff]{1,6}/,
        form: 'Thay đổi tăng dần: 越来越',
        level: 'HSK 3',
        formula: 'Chủ ngữ + 越来越 + tính từ / động từ trạng thái',
        explanation: '“越来越” cho biết mức độ thay đổi dần theo thời gian.',
        context: 'Dùng để mô tả xu hướng ngày càng tăng hoặc biến đổi.',
      },
      {
        pattern: /[\u3400-\u9fff]{1,5}(?:得|不)(?:到|懂|见|完|好|清楚|明白|开|住|起)/,
        form: 'Bổ ngữ khả năng với 得 / 不',
        level: 'HSK 3',
        formula: 'Động từ + 得/不 + bổ ngữ kết quả',
        explanation: '“得” biểu thị có thể đạt kết quả; “不” biểu thị không thể đạt kết quả đó.',
        context: 'Dùng để nói khả năng hoặc trở ngại thực tế, khác với bổ ngữ kết quả khẳng định thông thường.',
      },
      {
        pattern: /一[\u3400-\u9fff]{1,16}就[\u3400-\u9fff]{1,16}/,
        form: 'Hai việc nối tiếp: 一……就……',
        level: 'HSK 3',
        formula: '一 + sự việc/hành động 1 + 就 + sự việc/hành động 2',
        explanation: 'Biểu thị việc thứ hai xảy ra ngay khi hoặc ngay sau khi điều kiện/sự việc thứ nhất xuất hiện.',
        context: 'Dùng để nêu quan hệ thời gian sát nhau hoặc kết quả dễ xảy ra khi có điều kiện.',
      },
      {
        pattern: /对[\u3400-\u9fff]{1,12}感兴趣/,
        form: 'Nêu hứng thú: 对……感兴趣',
        level: 'HSK 3',
        formula: 'Chủ ngữ + 对 + đối tượng + 感兴趣',
        explanation: '“对” giới thiệu điều mà chủ thể quan tâm; “感兴趣” là vị ngữ.',
        context: 'Dùng để nói về sở thích hoặc mối quan tâm đối với một chủ đề/hoạt động.',
      },
      {
        pattern: /(?:又[\u3400-\u9fff]{1,12}又[\u3400-\u9fff]{1,8}|又[\u3400-\u9fff]{1,8}又[\u3400-\u9fff]{1,12})/,
        form: 'Hai đặc điểm đồng thời: 又……又……',
        level: 'HSK 3',
        formula: 'Chủ ngữ + 又 + đặc điểm/hành động 1 + 又 + đặc điểm/hành động 2',
        explanation: 'Hai vế “又” liệt kê hai đặc điểm hoặc hành động cùng đúng.',
        context: 'Dùng để mô tả đồng thời hai tính chất hoặc hành động, thường có cùng chủ thể.',
      },
      {
        pattern: /除了[\u3400-\u9fff]{1,12}(?:以外|之外)[\u3400-\u9fff]{0,8}(?:还|也|都|就)/,
        form: 'Bổ sung/loại trừ: 除了……以外……',
        level: 'HSK 3',
        formula: '除了 + thành phần A + 以外，(还/也) + phần còn lại',
        explanation: '“除了……以外” giới thiệu phần được thêm vào hoặc loại ra; từ nối sau đó giúp xác định cách hiểu.',
        context: '“还/也” thường báo nghĩa bổ sung; “都/就” thường gặp khi loại trừ. Cần đọc cả câu để phân biệt.',
      },
      {
        pattern: /把[\u3400-\u9fff]{1,6}[\u3400-\u9fff]{1,5}(?:了|到|在|给|成|完|好|开)/,
        form: 'Câu 把',
        level: 'HSK 4',
        formula: 'S + 把 + tân ngữ xác định + V + kết quả/đích đến',
        explanation: '“把” đưa tân ngữ lên trước động từ để nhấn mạnh cách xử lý hoặc kết quả tác động lên nó.',
        context: 'Động từ thường cần có bổ ngữ, kết quả, hướng, 了 hoặc thành phần phù hợp; không phải mọi động từ ngoại động đều dùng được.',
      },
      {
        pattern: /被[\u3400-\u9fff]{0,6}[\u3400-\u9fff]{1,8}(?:了|到|在|给|成|开|走)/,
        form: 'Câu bị động với 被',
        level: 'HSK 4',
        formula: 'Chủ thể chịu tác động + 被 + tác nhân (có thể lược) + động từ + kết quả',
        explanation: '“被” đánh dấu chủ thể nhận tác động của hành động; tác nhân có thể được nêu hoặc lược bỏ.',
        context: 'Dùng khi muốn tập trung vào người/vật bị tác động hoặc kết quả; sắc thái phụ thuộc ngữ cảnh.',
      },
      {
        pattern: /(?:只要[\u3400-\u9fff]{1,30}就|只有[\u3400-\u9fff]{1,30}才)/,
        form: 'Điều kiện cần/đủ: 只要……就…… / 只有……才……',
        level: 'HSK 4',
        formula: '只要 + điều kiện + 就 + kết quả / 只有 + điều kiện + 才 + kết quả',
        explanation: '“只要……就……” nêu điều kiện đủ; “只有……才……” nhấn mạnh điều kiện cần.',
        context: 'Dùng để phân biệt điều kiện dễ thỏa mãn với điều kiện bắt buộc cho kết quả.',
      },
      {
        pattern: /(?:即使|哪怕|就算)[\u3400-\u9fff]{1,30}(?:也|还)/,
        form: 'Giả nhượng bộ: 即使/哪怕/就算……也……',
        level: 'HSK 4',
        formula: '即使/哪怕/就算 + giả định，(也/还) + kết quả',
        explanation: 'Vế đầu nêu tình huống giả định mạnh; vế sau cho biết kết quả/quan điểm vẫn không đổi.',
        context: 'Dùng để nhấn mạnh kết quả bất chấp điều kiện được nêu.',
      },
      {
        pattern: /(?:不管|无论|不论)[\u3400-\u9fff]{1,30}(?:都|也)/,
        form: 'Nhượng bộ không điều kiện: 不管/无论……都/也……',
        level: 'HSK 4',
        formula: '不管/无论 + tình huống hoặc lựa chọn + 都/也 + kết quả',
        explanation: 'Dù tình huống thay đổi thế nào, mệnh đề sau vẫn được khẳng định.',
        context: 'Dùng với câu hỏi lựa chọn hoặc phạm vi khả năng để biểu đạt “bất kể…”.',
      },
      {
        pattern: /连[\u3400-\u9fff]{1,16}(?:都|也)[\u3400-\u9fff]{1,16}/,
        form: 'Nhấn mạnh với 连……都/也……',
        level: 'HSK 4',
        formula: '连 + thành phần được nhấn mạnh + 都/也 + vị ngữ',
        explanation: 'Đưa một trường hợp đáng chú ý vào vị trí nhấn mạnh; “都/也” dẫn đến kết quả bao gồm cả trường hợp đó.',
        context: 'Dùng để nhấn mạnh mức độ bất ngờ, cực đoan hoặc phạm vi bao quát.',
      },
      {
        pattern: /(?:不是[\u3400-\u9fff，,]{1,20}而是|并非[\u3400-\u9fff，,]{1,20}而是)/,
        form: 'Đính chính tương phản: 不是/并非……而是……',
        level: 'HSK 5',
        formula: '不是/并非 + ý bị phủ định，而是 + ý được khẳng định',
        explanation: 'Phủ định cách hiểu thứ nhất rồi nêu cách hiểu đúng hoặc trọng tâm thực sự.',
        context: 'Dùng để sửa thông tin hoặc đối lập hai cách giải thích.',
      },
      {
        pattern: /(?:与其[\u3400-\u9fff]{1,24}不如|宁可[\u3400-\u9fff]{1,24}也(?:不)?)/,
        form: 'So sánh lựa chọn: 与其……不如…… / 宁可……也……',
        level: 'HSK 5',
        formula: '与其 + lựa chọn A，不如 + lựa chọn B / 宁可 + A，也 + B',
        explanation: 'Nêu hai phương án và thể hiện phương án được ưu tiên hoặc chấp nhận hơn.',
        context: 'Dùng khi cân nhắc lựa chọn; “宁可” thường nhấn mạnh sự sẵn lòng chấp nhận một phương án.',
      },
      {
        pattern: /(?:之所以[\u3400-\u9fff]{1,24}是因为|正是因为[\u3400-\u9fff]{1,24}(?:所以|才))/,
        form: 'Giải thích nguyên nhân: 之所以……是因为……',
        level: 'HSK 5',
        formula: '之所以 + kết quả/hiện tượng + 是因为 + nguyên nhân',
        explanation: 'Đặt hiện tượng cần giải thích trước, sau đó nêu nguyên nhân.',
        context: 'Dùng để làm rõ vì sao một kết quả xảy ra; cấu trúc có thể nhấn nguyên nhân bằng “正是因为”.',
      },
      {
        pattern: /尽管[\u3400-\u9fff，,]{1,24}(?:却|还是|仍然|也)/,
        form: 'Nhượng bộ: 尽管……却/还是/仍然……',
        level: 'HSK 5',
        formula: '尽管 + sự thật/khó khăn，(却/还是/仍然) + kết quả',
        explanation: 'Thừa nhận một sự thật hoặc trở ngại rồi nêu kết quả không bị nó ngăn cản.',
        context: 'Dùng để nhấn mạnh sự tương phản giữa điều kiện thực tế và kết quả.',
      },
      {
        pattern: /(?:凡是[\u3400-\u9fff]{1,24}(?:都|就)|无论[\u3400-\u9fff]{1,24}都)/,
        form: 'Khái quát phạm vi: 凡是……都…… / 无论……都……',
        level: 'HSK 6',
        formula: '凡是 + nhóm/điều kiện + 都 + kết quả',
        explanation: 'Khái quát một quy tắc áp dụng cho mọi thành viên hoặc mọi trường hợp trong phạm vi nêu ra.',
        context: 'Thường dùng trong giải thích, lập luận hoặc phát biểu quy tắc có phạm vi rộng.',
      },
      {
        pattern: /(?:以免|免得)[\u3400-\u9fff]{1,20}/,
        form: 'Nêu mục đích phòng tránh: 以免 / 免得',
        level: 'HSK 6',
        formula: 'Hành động/phòng ngừa + 以免/免得 + kết quả không mong muốn',
        explanation: 'Nêu việc cần làm để tránh một kết quả xấu có thể xảy ra.',
        context: 'Thường xuất hiện trong lời khuyên, hướng dẫn hoặc giải thích lý do cần đề phòng.',
      },
      {
        pattern: /与其说[\u3400-\u9fff，,]{1,24}不如说/,
        form: 'Điều chỉnh cách diễn giải: 与其说……不如说……',
        level: 'HSK 6',
        formula: '与其说 + cách diễn giải A，不如说 + cách diễn giải B',
        explanation: 'Nêu cách mô tả chưa sát rồi đề xuất cách diễn giải phù hợp hơn.',
        context: 'Thường dùng trong lập luận hoặc văn viết để điều chỉnh sắc thái, nguyên nhân hay bản chất của sự việc.',
      },
      {
        pattern: /(?:从而|进而)[\u3400-\u9fff]{1,20}/,
        form: 'Nêu hệ quả tiếp theo: 从而 / 进而',
        level: 'HSK 6',
        formula: 'Nguyên nhân/hành động， 从而/进而 + hệ quả',
        explanation: 'Nối một hành động hoặc kết quả với hệ quả tiếp diễn hoặc mục tiêu đạt được.',
        context: 'Thường gặp trong văn viết giải thích, báo chí và lập luận.',
      },
    ],
    ja: [
      {
        pattern: /(から|ので).{0,30}(です|ます|だ|ない|。|！|？|$)/,
        form: 'Nêu lý do: から / ので',
        explanation: 'Đặt lý do trước kết quả. “ので” thường mềm/lịch sự hơn; “から” trực tiếp và thể hiện lý do theo góc nhìn người nói.',
        context: 'Dùng để giải thích lý do, đưa ra đề nghị hoặc nối nguyên nhân với kết luận.',
      },
      {
        pattern: /(けれども|けれど|けど|が).{1,40}/,
        form: 'Nối ý đối lập: けれど/けど/が',
        explanation: 'Liên kết hai ý tương phản; “けど” thân mật hơn, “けれども” đầy đủ/lịch sự hơn.',
        context: 'Dùng để nêu tương phản hoặc mở đầu lời nói nhẹ nhàng trước khi thêm ý khác.',
      },
      {
        pattern: /(ています|ている|ていました|ていた)/,
        form: 'Dạng ている',
        explanation: 'Có thể diễn tả hành động đang diễn ra, thói quen, hoặc trạng thái là kết quả của một hành động.',
        context: 'Cách hiểu phụ thuộc động từ: “食べている” thường là đang ăn, còn một số động từ chỉ trạng thái kết quả.',
      },
      {
        pattern: /(たいです|たい|たくない)/,
        form: 'Mong muốn: động từ たい',
        explanation: 'Gắn với gốc masu của động từ để nói người nói muốn làm việc gì; “たくない” diễn tả không muốn.',
        context: 'Thường nói mong muốn của bản thân; khi nói mong muốn của người khác cần chọn cách diễn đạt phù hợp.',
      },
      {
        pattern: /(ことができます|ことができる)/,
        form: 'Khả năng: động từ thể từ điển + ことができる',
        explanation: 'Danh từ hóa động từ bằng “こと”, rồi dùng “できる” để diễn tả khả năng/thực hiện được.',
        context: 'Dùng để nói ai đó có kỹ năng hoặc điều kiện làm việc gì.',
      },
      {
        pattern: /(と思います|と思う)/,
        form: 'Nêu suy nghĩ: ～と思う',
        explanation: 'Mệnh đề thường ở thể thường đứng trước “と思う”; “思います” là dạng lịch sự.',
        context: 'Dùng để nêu ý kiến hoặc phỏng đoán một cách mềm hơn khẳng định trực tiếp.',
      },
      {
        pattern: /(ます|ません|ました|です|でした)(?:[。！？!?]|$)/,
        form: 'Văn phong lịch sự です/ます',
        explanation: 'Dạng kết câu です/ます thể hiện văn phong lịch sự, trung tính.',
        context: 'Phù hợp trong giao tiếp với người chưa thân, môi trường học tập/công việc; không phải kính ngữ trang trọng nhất.',
      },
    ],
    it: [
      {
        pattern: /\b(?:ho|hai|ha|abbiamo|avete|hanno|sono|sei|è|siamo|siete)\s+\w+(?:ato|uto|ito|sso|tto|sto|rto|lto|nto|so)\b/i,
        form: 'Passato prossimo (avere/essere + participio)',
        level: 'A2',
        formula: 'avere/essere ở hiện tại + participio passato',
        explanation: 'Trợ động từ ở hiện tại kết hợp với quá khứ phân từ để kể một việc đã hoàn thành.',
        context: 'Rất thường dùng trong hội thoại về sự kiện quá khứ. Trợ động từ “essere” thường yêu cầu phân từ hòa hợp giống/số với chủ ngữ.',
      },
      {
        pattern: /\b(?:sto|stai|sta|stiamo|state|stanno)\s+\w+(?:ando|endo)\b/i,
        form: 'Đang diễn ra: stare + gerundio',
        level: 'A2',
        formula: 'stare chia hiện tại + gerundio (-ando/-endo)',
        explanation: 'Dạng chia của “stare” kết hợp gerundio để nhấn mạnh hành động đang xảy ra.',
        context: 'Dùng cho việc đang diễn ra ngay lúc nói; trong tiếng Ý hiện tại đơn cũng có thể diễn tả việc đang xảy ra.',
      },
      {
        pattern: /\b(?:se|qualora)\b.{1,100}\b(?:sarei|saresti|sarebbe|saremmo|sarebbero|avrei|avrebbe|potrei|potrebbe)\b/i,
        form: 'Câu điều kiện với se + condizionale',
        level: 'B1',
        formula: 'Se + mệnh đề điều kiện，mệnh đề kết quả ở condizionale',
        explanation: 'Nêu điều kiện bằng “se” và kết quả giả định ở thức condizionale.',
        context: 'Dùng cho giả định, mong muốn hoặc kết quả phụ thuộc vào điều kiện; cách chia thay đổi theo loại điều kiện.',
      },
      {
        pattern: /\b(?:vorrei|potrei|dovrei|sarei)\b/i,
        form: 'Condizionale',
        level: 'B1',
        formula: 'Chủ ngữ + động từ ở condizionale',
        explanation: 'Thức điều kiện diễn tả giả định, mong muốn hoặc lời nói lịch sự.',
        context: '“Vorrei” thường dùng để yêu cầu/mong muốn lịch sự; “dovrei” là lời khuyên hoặc nghĩa vụ nhẹ hơn “devo”.',
      },
      {
        pattern: /\b(?:andrò|farò|sarò|avrò|parlerò|mangerò|vivrò)\b/i,
        form: 'Futuro semplice',
        level: 'A2',
        formula: 'Chủ ngữ + động từ chia ở futuro semplice',
        explanation: 'Động từ được chia ở thì tương lai để nói dự định hoặc dự đoán.',
        context: 'Dùng cho sự việc tương lai; cũng có thể diễn tả phỏng đoán về hiện tại.',
      },
      {
        pattern: /\b(?:posso|puoi|può|possiamo|potete|possono|devo|devi|deve|dobbiamo|voglio|vuoi|vuole)\b/i,
        form: 'Động từ khuyết thiếu: potere / dovere / volere',
        level: 'A1',
        formula: 'potere / dovere / volere chia + động từ nguyên mẫu',
        explanation: 'Động từ được chia đứng trước động từ nguyên mẫu để diễn tả khả năng, nghĩa vụ hoặc mong muốn.',
        context: 'Chọn “potere” cho khả năng/cho phép, “dovere” cho nghĩa vụ và “volere” cho ý muốn.',
      },
      {
        pattern: /\bc['’]è(?=\s|$|[,.!?])|\bci sono\b/i,
        form: 'Nêu sự tồn tại: c’è / ci sono',
        level: 'A1',
        formula: 'C’è + danh từ số ít / Ci sono + danh từ số nhiều',
        explanation: '“C’è” và “ci sono” giới thiệu sự tồn tại của người/vật, lần lượt với số ít và số nhiều.',
        context: 'Thường dùng để nói một nơi có gì; khác với “è/sono” dùng để định danh hoặc mô tả chủ ngữ đã biết.',
      },
      {
        pattern: /\b(?:il|lo|la|i|gli|le|un|uno|una)\s+[a-zàèéìòù]+/i,
        form: 'Mạo từ đi với danh từ',
        level: 'A1',
        formula: 'Mạo từ xác định/không xác định + danh từ, hòa hợp giống và số',
        explanation: 'Mạo từ cho biết danh từ được nói đến cụ thể hay chưa xác định và thay đổi theo giống, số, âm đầu của danh từ.',
        context: 'Dùng trước danh từ; dạng mạo từ xác định gồm il/lo/la/i/gli/le, còn dạng không xác định gồm un/uno/una.',
      },
      {
        pattern: /\b(?:sono|sei|è|siamo|siete)\s+(?:un|uno|una|il|la|lo|i|gli|le)\s+[a-zàèéìòù]+/i,
        form: 'Câu giới thiệu/định danh với essere',
        level: 'A1',
        formula: 'Chủ ngữ + essere + danh từ/cụm danh từ',
        explanation: '“Essere” nối chủ ngữ với nghề nghiệp, danh tính hoặc một phân loại; mạo từ có thể thay đổi theo cách dùng.',
        context: 'Dùng để giới thiệu hoặc xác định một người/vật; không phải mọi nghề nghiệp sau essere đều cần mạo từ.',
      },
      {
        pattern: /\b(?:mio|mia|miei|mie|tuo|tua|tuoi|tue|suo|sua|suoi|sue|nostro|nostra|nostri|nostre|vostro|vostra|vostri|vostre)\s+[a-zàèéìòù]+/i,
        form: 'Tính từ sở hữu',
        level: 'A1',
        formula: 'Mạo từ + tính từ sở hữu hòa hợp với danh từ',
        explanation: 'Tính từ sở hữu thường đi với mạo từ và hòa hợp giống/số với vật được sở hữu, không phải với người sở hữu.',
        context: 'Quan hệ gia đình số ít thường có thể lược mạo từ, trừ một số trường hợp nhấn mạnh hoặc có bổ nghĩa.',
      },
      {
        pattern: /\b(?:non\s+)?(?:sono|sei|è|siamo|siete)\s+(?:più|meno|così|tanto)\b|\b(?:più|meno)\s+[a-zàèéìòù]+\s+(?:di|che)\b/i,
        form: 'So sánh hơn/kém hoặc ngang bằng',
        level: 'A2',
        formula: 'più/meno + tính từ + di/che; così/tanto + tính từ + come/quanto',
        explanation: '“Più/meno” tạo so sánh hơn/kém; “così/tanto… come/quanto” thường diễn tả mức độ ngang bằng.',
        context: '“Di” thường so sánh hai đối tượng; “che” thường dùng khi so sánh hai thuộc tính hoặc hai hành động của cùng đối tượng.',
      },
      {
        pattern: /\b(?:ero|eri|era|eravamo|eravate|erano|avevo|avevi|aveva|avevamo|avevate|avevano|andavo|andavi|andava|facevo|facevi|faceva|vivevo|vivevi|viveva|studiavo|studiavi|studiava|studiavamo|studiavano|parlavo|parlava|lavoravo|lavorava|mangiavo|mangiava|leggevo|leggeva|scrivevo|scriveva|dormivo|dormiva)\b/i,
        form: 'Imperfetto',
        level: 'A2',
        formula: 'Chủ ngữ + động từ chia ở imperfetto',
        explanation: 'Imperfetto trình bày bối cảnh, thói quen, trạng thái hoặc hành động đang tiếp diễn trong quá khứ.',
        context: 'Thường kết hợp với passato prossimo: imperfetto làm nền, passato prossimo kể sự kiện xảy ra.',
      },
      {
        pattern: /\b(?:mentre|quando)\b.{1,90}\b(?:ero|era|eravamo|erano|avevo|aveva|facevo|faceva|andavo|andava|[a-zàèéìòù]+(?:avo|avi|ava|avamo|avate|avano|evo|evi|eva|evamo|evate|evano|ivo|ivi|iva|ivamo|ivate|ivano))\b/i,
        form: 'Mệnh đề thời gian với imperfetto',
        level: 'B1',
        formula: 'Mentre/quando + mệnh đề ở imperfetto，mệnh đề chính',
        explanation: 'Mệnh đề thời gian với imperfetto thường nêu một hành động đang diễn ra hoặc bối cảnh lúc một việc khác xảy ra.',
        context: '“Mentre” thường nhấn mạnh hai việc đồng thời; lựa chọn giữa imperfetto và passato prossimo phụ thuộc cách nhìn sự việc.',
      },
      {
        pattern: /\b(?:sarò|sarai|sarà|saremo|sarete|saranno|avrò|avrai|avrà|avremo|avrete|avranno|andrò|andrai|andrà|faremo|faranno|parlerò|vivremo)\b/i,
        form: 'Futuro semplice',
        level: 'A2',
        formula: 'Chủ ngữ + động từ chia ở futuro semplice',
        explanation: 'Futuro semplice biểu đạt dự định hoặc dự đoán; đôi khi cũng dùng để phỏng đoán về hiện tại.',
        context: 'Dạng tương lai được tạo theo nhóm chia động từ, có một số gốc bất quy tắc như sar-, avr-, andr-, far-.',
      },
      {
        pattern: /\b(?:prima di|dopo aver|dopo essere)\s+(?:\w+are|\w+ere|\w+ire|\w+ato|\w+uto|\w+ito)\b/i,
        form: 'Mệnh đề thời gian với nguyên mẫu',
        level: 'B1',
        formula: 'prima di + infinito / dopo aver-essere + participio passato',
        explanation: '“Prima di” thường đi với động từ nguyên mẫu; “dopo aver/essere” dùng nguyên mẫu kép để chỉ hành động đã hoàn tất trước đó.',
        context: 'Dùng khi chủ thể của hai hành động được hiểu là giống nhau; với dopo, chọn avere/essere theo động từ.',
      },
      {
        pattern: /\b(?:benché|sebbene|nonostante)(?=\s|$).{1,90}\b(?:sia|abbia|vada|faccia|possa|venga|dica|abbiano|siano)\b/i,
        form: 'Congiuntivo sau liên từ nhượng bộ',
        level: 'B2',
        formula: 'Benché/sebbene/nonostante + congiuntivo',
        explanation: 'Các liên từ nhượng bộ này thường dẫn mệnh đề ở thức congiuntivo.',
        context: 'Dùng trong văn phong chuẩn để nêu một sự thật không ngăn cản kết quả ở mệnh đề chính.',
      },
      {
        pattern: /(?:\b(?:penso|credo|spero|sembra)\s+che|(?:è possibile|è importante)\s+che)\b.{1,70}\b(?:sia|abbia|vada|faccia|possa|venga|dica|abbiano|siano)\b/i,
        form: 'Congiuntivo sau ý kiến/đánh giá',
        level: 'B2',
        formula: 'Động từ/biểu thức đánh giá + che + congiuntivo',
        explanation: 'Một số động từ và biểu thức thể hiện ý kiến, cảm xúc, mong muốn hoặc đánh giá thường dẫn đến congiuntivo.',
        context: 'Cách dùng phụ thuộc mức độ chắc chắn và cấu trúc cụ thể; không phải mọi mệnh đề sau “che” đều dùng congiuntivo.',
      },
      {
        pattern: /\b(?:sono|è|siamo|era|erano|sarà|saranno)\b.{0,30}\b(?:stato|stata|stati|state|fatto|fatta|fatti|fatte|detto|detta|scritti|scritte|visto|vista)\b/i,
        form: 'Thể bị động với essere',
        level: 'B1',
        formula: 'Chủ thể chịu tác động + essere + participio passato (+ da + tác nhân)',
        explanation: 'Essere kết hợp với quá khứ phân từ để tạo thể bị động; phân từ hòa hợp với chủ thể về giống và số.',
        context: 'Dùng khi muốn tập trung vào đối tượng chịu tác động hơn là người thực hiện.',
      },
      {
        pattern: /\b(?:mi|ti|lo|la|ci|vi|li|le|si)\s+(?:sono|sei|è|siamo|siete|hanno|ha|ho|può|posso|vuole|deve|stanno|sto)\b/i,
        form: 'Đại từ clitico trước động từ',
        level: 'B1',
        formula: 'Đại từ bổ ngữ không nhấn + động từ chia',
        explanation: 'Đại từ bổ ngữ không nhấn thường đứng trước động từ đã chia; với nguyên mẫu thường gắn vào cuối động từ.',
        context: 'Cần phân biệt đại từ trực tiếp, gián tiếp và phản thân; hình thức giống nhau có thể có vai trò khác nhau.',
      },
      {
        pattern: /\b(?:stavo|stavi|stava|stavamo|stavate|stavano)\s+\w+(?:ando|endo)\b/i,
        form: 'Hành động đang diễn ra trong quá khứ',
        level: 'B1',
        formula: 'Stare ở imperfetto + gerundio',
        explanation: '“Stare” ở imperfetto kết hợp gerundio diễn tả một hành động đang diễn ra tại một thời điểm trong quá khứ.',
        context: 'Thường làm nền cho một sự kiện xen vào được kể bằng passato prossimo.',
      },
      {
        pattern: /\b(?:avevo|avevi|aveva|avevamo|avevate|avevano|ero|eri|era|eravamo|eravate|erano)\s+\w+(?:ato|uto|ito|sso|tto|sto|rto|lto|nto|so)\b/i,
        form: 'Trapassato prossimo hoặc dạng ghép của essere',
        level: 'B1',
        formula: 'Essere/avere ở imperfetto + participio passato',
        explanation: 'Trợ động từ ở imperfetto kết hợp với participio passato tạo trapassato prossimo, diễn tả việc xảy ra trước một mốc quá khứ.',
        context: 'Cần phân biệt với “è stato” là passato prossimo của essere; dấu hiệu thời gian và mệnh đề xung quanh quyết định cách hiểu.',
      },
      {
        pattern: /\b(?:avrei|avresti|avrebbe|avremmo|avreste|avrebbero|sarei|saresti|sarebbe|saremmo|sareste|sarebbero)\s+\w+(?:ato|uto|ito|sso|tto|sto|rto|lto|nto|so)\b/i,
        form: 'Condizionale passato',
        level: 'B2',
        formula: 'Avere/essere ở condizionale + participio passato',
        explanation: 'Condizionale passato diễn tả kết quả giả định trong quá khứ, mong muốn không thành hoặc tương lai nhìn từ một mốc quá khứ.',
        context: 'Thường xuất hiện trong câu điều kiện loại không có thật hoặc lời kể gián tiếp.',
      },
      {
        pattern: /\b(?:se|qualora)\b.{1,70}\b(?:avessi|avesse|avessimo|avessero|fossi|fosse|fossimo|fossero)\b.{1,70}\b[a-zàèéìòù]+(?:rei|resti|rebbe|remmo|reste|rebbero)\b/i,
        form: 'Giả định không có thật: congiuntivo imperfetto + condizionale',
        level: 'B2',
        formula: 'Se + congiuntivo imperfetto，condizionale presente',
        explanation: 'Mệnh đề điều kiện dùng congiuntivo imperfetto; kết quả giả định dùng condizionale presente.',
        context: 'Dùng để nói về tình huống giả định hoặc khó xảy ra ở hiện tại/tương lai.',
      },
      {
        pattern: /\b(?:se|qualora)\b.{1,70}\b(?:avessi|avesse|avessimo|avessero|fossi|fosse|fossimo|fossero)\s+(?:stato|stata|stati|state|avuto|avuta|avuti|avute|andato|andata|andati|andate|fatto|fatta|fatti|fatte|visto|vista|visti|viste)\b.{1,70}\b(?:avrei|avrebbe|avremmo|avrebbero|sarei|sarebbe|saremmo|sarebbero)\b/i,
        form: 'Giả định quá khứ: congiuntivo trapassato + condizionale passato',
        level: 'B2',
        formula: 'Se + congiuntivo trapassato，condizionale passato',
        explanation: 'Mệnh đề điều kiện diễn tả việc không xảy ra trong quá khứ; mệnh đề kết quả nêu kết quả giả định.',
        context: 'Dùng để nói tiếc nuối hoặc suy đoán về kết quả khác trong quá khứ.',
      },
      {
        pattern: /\b(?:parla|ascolta|guarda|prendi|vieni|dimmi|faccia|vada|dica|abbia|sia)\b(?:\s+[a-zàèéìòù]+){0,5}[.!]?$/i,
        form: 'Mệnh lệnh trực tiếp hoặc lịch sự',
        level: 'A2',
        formula: 'Động từ ở imperativo (tu/voi) / congiuntivo presente lịch sự (Lei)',
        explanation: 'Imperativo dùng để yêu cầu, khuyên hoặc hướng dẫn; dạng lịch sự Lei thường lấy hình thức congiuntivo presente.',
        context: 'Đại từ clitico gắn sau mệnh lệnh thân mật khẳng định nhưng đứng trước mệnh lệnh phủ định hoặc hình thức lịch sự.',
      },
      {
        pattern: /\b(?:nonostante|anche se|sebbene|benché)\b/i,
        form: 'Mệnh đề nhượng bộ',
        level: 'B1',
        formula: 'Liên từ nhượng bộ + mệnh đề',
        explanation: 'Liên từ nhượng bộ nối một điều có thật hoặc giả định với kết quả không bị điều đó ngăn cản.',
        context: '“Anche se” thường đi với indicativo trong cách dùng thông dụng; “benché/sebbene/nonostante” thường đòi hỏi congiuntivo.',
      },
    ],
  };

  const replacements = {
    en: [
      ['important', ['essential', 'significant']], ['good', ['great', 'excellent']],
      ['bad', ['poor', 'unfavorable']], ['big', ['large', 'huge']],
      ['small', ['tiny', 'little']], ['happy', ['glad', 'pleased']],
      ['help', ['assist', 'support']], ['start', ['begin', 'launch']],
      ['show', ['demonstrate', 'present']], ['use', ['employ', 'apply']],
      ['think', ['believe', 'consider']], ['want', ['wish', 'prefer']],
      ['beautiful', ['lovely', 'attractive']], ['make', ['create', 'produce']],
    ],
    it: [
      ['importante', ['essenziale', 'rilevante']], ['buono', ['ottimo', 'valido']],
      ['bello', ['splendido', 'attraente']], ['grande', ['enorme', 'vasto']],
      ['piccolo', ['minuscolo', 'ridotto']], ['felice', ['contento', 'lieto']],
      ['aiutare', ['assistere', 'sostenere']], ['iniziare', ['cominciare', 'avviare']],
      ['parlare', ['discutere', 'raccontare']], ['usare', ['utilizzare', 'adoperare']],
      ['volere', ['desiderare', 'preferire']],
    ],
    zh: [
      ['重要', ['关键', '必要']], ['喜欢', ['喜爱', '热爱']], ['高兴', ['开心', '愉快']],
      ['漂亮', ['美丽', '好看']], ['大', ['巨大', '庞大']], ['小', ['微小', '细小']],
      ['帮助', ['协助', '支持']], ['开始', ['着手', '启动']], ['说', ['讲', '表达']],
      ['学习', ['学', '研究']],
    ],
    ja: [
      ['重要', ['大切', '肝心']], ['大切', ['重要', '肝心']], ['好き', ['気に入る', '愛する']],
      ['嬉しい', ['楽しい', '喜ばしい']], ['良い', ['素晴らしい', '適切']],
      ['いい', ['素晴らしい', '適切']], ['大きい', ['巨大な', '広い']],
      ['小さい', ['小さな', '狭い']], ['話す', ['述べる', '語る']],
      ['学ぶ', ['勉強する', '習得する']], ['勉強', ['学習', '学び']],
      ['使う', ['利用する', '活用する']],
    ],
  };

  function baseLanguage(language) {
    const base = (language || '').toLowerCase().split('-')[0];
    return base === 'zh' || base === 'ja' || base === 'en' || base === 'it' ? base : '';
  }

  function findReplacements(text, language) {
    const rules = replacements[language] || [];
    return rules
      .filter(([word]) => language === 'zh' || language === 'ja'
        ? text.includes(word)
        : new RegExp('\\b' + word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i').test(text))
      .slice(0, 4)
      .map(([word, options]) => ({ word, options }));
  }

  function analyzeEnglishStructure(text) {
    const sentence = text.trim().replace(/[.!?]+$/, '');
    const thereMatch = sentence.match(/^(There)\s+(is|are|was|were)\s+(.+)$/i);
    if (thereMatch) {
      const [, there, beVerb, subject] = thereMatch;
      return {
        sentenceType: 'Câu giới thiệu sự tồn tại',
        formula: 'There + be + danh từ (be hòa hợp với danh từ theo sau)',
        structure: [
          { part: there, role: 'Từ mở đầu cấu trúc tồn tại' },
          { part: beVerb, role: 'Động từ be, chia theo danh từ theo sau' },
          { part: subject, role: 'Danh từ/cụm danh từ được giới thiệu' },
        ],
        grammar: {
          form: 'Cấu trúc there is / there are',
          example: `${there} ${beVerb} ${subject}`,
          explanation: `“${there} ${beVerb}” giới thiệu sự tồn tại; “${subject}” là người/vật được nhắc đến. Chọn is/was cho số ít và are/were cho số nhiều.`,
          context: 'Dùng để giới thiệu rằng có người hoặc vật ở một nơi/tình huống; động từ hòa hợp với cụm danh từ đứng sau.',
        },
      };
    }

    const preferenceMatch = sentence.match(/^(.+?)\s+(like|likes|love|loves|enjoy|enjoys)\s+((?:to\s+\w+|\w+ing\b)(?:\s+.+)?)$/i);
    if (preferenceMatch) {
      const [, subject, preference, activity] = preferenceMatch;
      const gerund = /\b\w+ing\b/i.test(activity) && !/^to\s+/i.test(activity);
      const grammar = {
        form: 'Sở thích với like / love / enjoy',
        formula: gerund
          ? 'S + like/love/enjoy + V-ing + (bổ ngữ)'
          : 'S + like/love + to-V + (bổ ngữ)',
        example: `${subject} ${preference} ${activity}`,
        explanation: 'Like và love có thể đi với V-ing hoặc to-V; enjoy thường đi với V-ing. Phần động từ có thể đi kèm tân ngữ hoặc cụm bổ nghĩa.',
        context: 'Dùng để diễn đạt sở thích hoặc điều người nói thích làm.',
      };
      return {
        sentenceType: 'Câu diễn đạt sở thích',
        formula: grammar.formula,
        structure: [
          { part: subject, role: 'Chủ ngữ' },
          { part: preference, role: 'Động từ diễn đạt sở thích' },
          { part: activity, role: gerund ? 'Hoạt động ở dạng V-ing' : 'Hoạt động ở dạng to-V' },
        ],
        grammar,
      };
    }

    const match = sentence.match(/^(This|That|These|Those|I|You|He|She|It|We|They)\s+(am|is|are|was|were)\s+(.+)$/i);
    if (!match) return null;

    const [, subject, beVerb, complement] = match;
    if (/^\w+ing\b/i.test(complement)) return null;
    const singular = /^(this|that|he|she|it)$/i.test(subject);
    const expectedBe = /^(was|were)$/i.test(beVerb)
      ? (/^(i|he|she|it|this|that)$/i.test(subject) ? 'was' : 'were')
      : /^(i)$/i.test(subject) ? 'am'
        : singular ? 'is' : 'are';
    const correctBe = beVerb.toLowerCase() === expectedBe;
    const complementIsSingularNoun = /^(?:a|an)\s+\S+/i.test(complement);
    const complementIsPluralNoun = !/^(?:a|an|the|this|that|these|those)\b/i.test(complement) &&
      /^[\w'-]+s\b/i.test(complement);
    const complementRole = complementIsSingularNoun || complementIsPluralNoun
      ? 'Bổ ngữ danh từ'
      : 'Bổ ngữ (mô tả hoặc xác định chủ ngữ)';
    const agreementNote = correctBe
      ? ''
      : `Chưa hòa hợp chủ ngữ - động từ: “${subject}” thường đi với “${expectedBe}”.`;
    const numberNote = complementIsSingularNoun && !singular
      ? ' These/those chỉ nhiều vật, nên bổ ngữ danh từ thường ở số nhiều.'
      : complementIsPluralNoun && singular
        ? ' This/that chỉ một vật, nên bổ ngữ danh từ thường ở số ít (a/an + danh từ).'
        : '';
    const beForm = expectedBe;
    const formula = /^(this|that|these|those)$/i.test(subject)
      ? `${singular ? 'This/That' : 'These/Those'} + ${beForm} + ${complementIsSingularNoun ? 'a/an + danh từ số ít' : complementIsPluralNoun ? 'danh từ số nhiều' : 'bổ ngữ'}`
      : /^(i)$/i.test(subject)
        ? `I + ${beForm} + bổ ngữ`
        : /^(he|she|it)$/i.test(subject)
          ? `He/She/It + ${beForm} + bổ ngữ`
          : /^(you|we|they)$/i.test(subject)
            ? `You/We/They + ${beForm} + bổ ngữ`
            : `S + ${beForm} + bổ ngữ`;
    const structure = [
      { part: subject, role: `Chủ ngữ (đại từ chỉ định ${singular ? 'số ít' : 'số nhiều'})` },
      { part: beVerb, role: `Động từ be ở hiện tại (${singular ? 'số ít' : 'số nhiều'})` },
      { part: complement, role: complementRole },
    ];

    return {
      sentenceType: 'Câu khẳng định với động từ be',
      formula,
      structure,
      grammar: {
        form: 'Câu với động từ be (chủ ngữ + be + bổ ngữ)',
        example: `${subject} ${beVerb} ${complement}`,
        explanation: `“${subject}” làm chủ ngữ; “${beVerb}” là động từ be; “${complement}” là phần bổ ngữ. ${agreementNote || 'Chủ ngữ và động từ đang hòa hợp.'}${numberNote}`,
        context: 'Dùng để giới thiệu hoặc xác định người/vật. This/these thường chỉ vật gần; that/those thường chỉ vật xa hoặc đã được nhắc đến.',
      },
    };
  }

  function analyze(text, locale) {
    const language = baseLanguage(locale);
    if (!language) {
      return {
        language: '',
        sentenceType: '',
        formula: '',
        structure: [],
        grammar: [],
        context: 'Phân tích cơ bản hiện hỗ trợ tiếng Anh, Trung, Nhật và Ý.',
        alternatives: [],
      };
    }

    const specialized = language === 'en' ? analyzeEnglishStructure(text) : null;
    const matches = [
      ...(specialized ? [specialized.grammar] : []),
      ...(grammar[language] || [])
      .map(rule => {
        if (specialized && (
          rule.form === 'Đại từ chỉ định + động từ be' ||
          rule.form === 'Cấu trúc there is / there are'
        )) return null;
        if (rule.form === 'Hiện tại hoàn thành' && /\b(?:have|has)\s+been\s+\w+ing\b/i.test(text)) return null;
        if (rule.form === 'Hiện tại hoàn thành' && /\bto\s+have\b/i.test(text)) return null;
        if (rule.form === 'Quá khứ hoàn thành' && /\bhad\s+been\s+\w+ing\b/i.test(text)) return null;
        if (rule.form === 'Hiện tại tiếp diễn' && /\b(?:am|is|are)\s+(?:getting\s+)?used\s+to\b/i.test(text)) return null;
        if (rule.form === 'Thói quen cũ với used to' && /\b(?:am|is|are|was|were|get|gets|got|getting)\s+(?:getting\s+)?used\s+to\b/i.test(text)) return null;
        if (rule.form === 'Quá khứ đơn' && /\b(?:am|is|are|was|were)\s+(?:said|reported|thought|believed|known|considered)\s+to\b/i.test(text)) return null;
        if (rule.form === 'Động từ khuyết thiếu' && /\bwill\b/i.test(text)) return null;
        if (rule.form === 'Động từ khuyết thiếu' && /\bwould\s+rather\b/i.test(text)) return null;
        if (rule.form === 'Hiện tại đơn (thói quen/tần suất)' && /^\s*(?:never|rarely|seldom)\b/i.test(text)) return null;
        if (/^Câu điều kiện loại [012]$/.test(rule.form) && /\bif\s+it\s+(?:(?:were|was)\s+not|weren't|wasn't)\s+for\b/i.test(text)) return null;
        if (rule.form === 'Câu điều kiện loại 2' && /\bif\b[^.!?]{0,100}\bhad\b[^.!?]{0,80}\bwould\s+have\b/i.test(text)) return null;
        const found = text.match(rule.pattern);
        return found ? {
          form: rule.form,
          level: rule.level || '',
          formula: rule.formula || '',
          example: found[0],
          explanation: rule.explanation,
          context: rule.context,
        } : null;
      })
      .filter(Boolean),
    ].slice(0, 5);

    return {
      language,
      sentenceType: specialized?.sentenceType || '',
      formula: specialized?.formula || '',
      structure: specialized?.structure || [],
      grammar: matches,
      context: matches.length
        ? matches.map(item => item.context).join(' ')
        : 'Chưa nhận diện được mẫu ngữ pháp phổ biến trong câu. Hãy xem câu đầy đủ và ngữ cảnh video; đây là bộ phân tích quy tắc cơ bản.',
      alternatives: findReplacements(text, language),
    };
  }

  const api = { analyze, baseLanguage };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.SentenceAnalysis = api;
})(typeof window !== 'undefined' ? window : this);

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thông Báo Kích Hoạt Tài Khoản</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        h2 {
            color: #2ecc71; /* Màu xanh lá cây: #2ecc71 */
        }

        p {
            color: #555555;
            line-height: 1.6;
        }

        ul {
            list-style-type: disc;
            padding-left: 20px;
        }

        p.signature {
            margin-top: 20px;
        }
    </style>
</head>

<body>
    <div class="container">
        <h2>Thông Báo Mở Khóa Tài Khoản</h2>
        <p>Chào {{ $fullname }},</p>
        <p>Chúc mừng! Tài khoản của bạn đã được kích hoạt trở lại thành công.</p>
        <p>Dưới đây là một số lưu ý để tránh vi phạm quy tắc trong tương lai:</p>
        <ul>
            <li>Đọc và hiểu rõ quy tắc cộng đồng của chúng tôi.</li>
            <li>Không chia sẻ thông tin cá nhân quá mức hoặc sử dụng tài khoản một cách không an toàn.</li>
            <li>Tránh sử dụng ngôn ngữ bất lịch sự hoặc tạo ra nội dung gây xúc phạm.</li>
            <li>Không tham gia vào hành vi spam hoặc quảng cáo không được phép.</li>
            <li>Thực hiện xác minh tài khoản một cách đầy đủ theo yêu cầu của chúng tôi.</li>
            <li>Đối xử tôn trọng và hợp tác với các thành viên khác trong cộng đồng.</li>
            <!-- Thêm các lưu ý khác tùy theo yêu cầu của bạn -->
        </ul>
        <p>Bạn có thể bắt đầu sử dụng tài khoản ngay bây giờ để trải nghiệm đầy đủ các tính năng của chúng tôi.</p>
        <p>Xin chân thành cảm ơn sự thông hiểu và hợp tác của bạn trong quá trình này.</p>
        <p class="signature">Trân trọng!</p>
    </div>
</body>

</html>

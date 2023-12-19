<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thông Báo Tạm Thời Khóa Tài Khoản</title>
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
            color: #e74c3c; /* Màu đỏ: #e74c3c */
        }

        p {
            color: #555555;
            line-height: 1.6;
        }

        .highlight {
            color: #e74c3c; /* Màu đỏ: #e74c3c */
            font-weight: bold;
        }

        p.signature {
            margin-top: 20px;
        }
    </style>
</head>

<body>
    <div class="container">
        <h2>Thông Báo Tạm Thời Khóa Tài Khoản</h2>
        <p>Chào {{ $fullname }},</p>
        <p>Chúng tôi xin gửi lời chào trân trọng đến bạn từ {{ env('APP_NAME') }}. Đầu tiên, chúng tôi xin chân thành cảm ơn sự quan tâm và sử dụng dịch vụ của chúng tôi.</p>
        <p>Chúng tôi muốn thông báo rằng tài khoản của bạn hiện đang tạm thời bị khóa do vi phạm: <span class="highlight">{{ $reason }}</span></p>
        <p>Xin chân thành cảm ơn sự thông hiểu và hợp tác của bạn trong việc giữ cho cộng đồng của chúng tôi an toàn và tích cực.</p>
        <p class="signature">Trân trọng!</p>
    </div>
</body>

</html>

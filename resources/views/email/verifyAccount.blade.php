<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Xác Nhận Tài Khoản</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; text-align: center;">

    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); padding: 40px;">
        <div style="font-size: 24px; color: #3498db; margin-bottom: 20px;">Xác Nhận Tài Khoản Của Bạn</div>
        <p>Cảm ơn bạn đã đăng ký tài khoản.<br>
        Để hoàn tất quá trình đăng ký, vui lòng sử dụng mã xác nhận dưới đây:</p>
        <div style="font-size: 36px; color: #2ecc71; margin-bottom: 40px;">{{ $codeVerify }}</div>
        <p>Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email này.</p>
    </div>

</body>
</html>
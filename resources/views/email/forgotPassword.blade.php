
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Thông Báo Thay Đổi Mật Khẩu</title>
    <style>
        
        table {
            width: 100%;
        }
        td {
            text-align: center;
            padding: 20px;
        }
        h3{
          color: black;
        }
        h1 {
            color: #3498db;
        }
        p {
            font-size: 16px;
            color: black;
        }
    </style>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; text-align: center;">
<div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); padding: 40px;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td align="center">
                <h1>Thay Đổi Mật Khẩu Thành Công</h1>
                <h3 style=" margin-bottom: 20px;">Xin chào <span style=" color: #2ecc71; margin-bottom: 20px;">{{$username}}</span>,</h3>
                <p>Mật khẩu của bạn đã được thay đổi thành công. Bây giờ bạn có thể đăng nhập bằng mật khẩu mới.</p>
                <p style="font-size: 20px; color: #2ecc71; margin-bottom: 20px;">{{ $password }}</p>
               
                <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!</p>
            </td>
        </tr>
    </table>
</div>
    
</body>
</html>
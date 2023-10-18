Khi bạn đã hoàn thành các chức năng mới trên nhánh phụ và muốn rebase code của nhánh phụ vào nhánh chính (thường là `main` hoặc `master`), bạn có thể tuân theo các bước sau:

1. **Commit và đẩy các thay đổi lên nhánh phụ:**

   Trước khi bạn thực hiện rebase, hãy chắc chắn rằng bạn đã commit và đẩy tất cả các thay đổi của mình lên nhánh phụ. Sử dụng các lệnh sau:

   ```bash
   git add .
   git commit -m "Mô tả commit"
   git push origin feature-branch
   ```

2. **Đảm bảo bạn đang ở nhánh chính:**

   Trước tiên, chắc chắn rằng bạn đang ở nhánh chính. Sử dụng lệnh sau:

   ```bash
   git checkout main
   ```

3. **Kéo các thay đổi mới nhất từ nhánh chính:**

   Đảm bảo rằng bạn đang cập nhật nhánh chính của bạn với phiên bản mới nhất từ kho lưu trữ xa bằng cách chạy:

   ```bash
   git pull origin main
   ```
4. **Checkout về nhánh cũ:**

   Đảm bảo đã về nhánh cũ (Nhánh muốn rebase với main)
   ```bash
   git checkout feature-branch
   ```
5. **Rebase nhánh phụ lên nhánh chính:**

   Sau khi bạn đã đảm bảo rằng nhánh chính là mới nhất và bạn đang ở nhánh chính, bạn có thể rebase nhánh phụ lên nhánh chính bằng cách chạy lệnh:

   ```bash
   git rebase main
   ```

   Điều này sẽ đưa các commit mới của bạn từ nhánh phụ và đặt chúng lên đầu những commit mới nhất trên nhánh chính. Trong quá trình rebase, có thể xảy ra xung đột mà bạn cần phải giải quyết.

6. **Giải quyết xung đột (nếu cần):**

   Nếu trong quá trình rebase có xung đột giữa commit của bạn và commit trên nhánh chính, bạn cần phải giải quyết chúng. Sử dụng lệnh `git status` để kiểm tra xem có xung đột nào không, sau đó sử dụng `git add` để đánh dấu các tệp đã giải quyết và `git rebase --continue` để tiếp tục quá trình rebase.

7. **Đẩy các thay đổi sau khi rebase:**

   Sau khi bạn đã hoàn thành quá trình rebase và giải quyết xung đột (nếu có), hãy đẩy các thay đổi lên nhánh phụ của bạn:

   ```bash
   git push origin feature-branch
   ```

8. **Tạo pull request (nếu cần):**

   Nếu bạn muốn đưa các thay đổi từ nhánh phụ vào nhánh chính qua một pull request, bạn có thể tạo pull request trên nền tảng quản lý mã nguồn của bạn, ví dụ: GitHub, GitLab, hoặc Bitbucket.

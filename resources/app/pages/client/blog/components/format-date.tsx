export const formatDateFromCreatedAt = (created_at: any) => {
  const createdAtDate = new Date(created_at);
  const currentDate = new Date();

  // Tính số mili giây giữa hai ngày
  const timeDifference = currentDate - createdAtDate;

  const minutes = Math.floor(timeDifference / (1000 * 60)); // Tính số phút
  const days = Math.floor(minutes / (60 * 24)); // Tính số ngày
  const weeks = Math.floor(days / 7); // Tính số tuần
  const remainingDays = days % 7; // Số ngày còn lại sau khi tính số tuần
  const remainingMinutes = minutes % 60; // Số phút còn lại sau khi tính số giờ

  let result = '';

  if (weeks > 0) {
    result += `${weeks} tuần `;
  }
  if (remainingDays > 0) {
    result += `${remainingDays} ngày `;
  }
  if (remainingMinutes > 0) {
    result += `${remainingMinutes} phút`;
  }

  return result.trim(); // Loại bỏ khoảng trắng ở đầu và cuối chuỗi
};

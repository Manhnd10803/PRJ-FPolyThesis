export const formatDateFromCreatedAt = (created_at: any) => {
  const createdAtDate = new Date(created_at);
  const currentDate = new Date();

  const timeDifference = currentDate - createdAtDate;
  const seconds = Math.floor(timeDifference / 1000); // Tính số giây

  if (seconds < 60) {
    return `${seconds} giây trước`;
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} phút trước`;
  } else if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    return `${hours} giờ trước`;
  } else if (seconds < 604800) {
    const days = Math.floor(seconds / 86400);
    return `${days} ngày trước`;
  } else {
    const weeks = Math.floor(seconds / 604800); // 7 ngày = 1 tuần
    if (weeks < 4) {
      return `${weeks} tuần trước`;
    } else {
      const months = Math.floor(weeks / 4);
      if (months < 12) {
        return `${months} tháng trước`;
      } else {
        const years = Math.floor(months / 12);
        return `${years} năm trước`;
      }
    }
  }
};
export const formatDMYCreatedAt = (created_at: string): string => {
  const date = new Date(created_at); // Chuyển chuỗi thành đối tượng Date
  const day = date.getDate().toString().padStart(2, '0'); // Lấy ngày, thêm số 0 ở đầu nếu cần
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Lấy tháng, thêm số 0 ở đầu nếu cần
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

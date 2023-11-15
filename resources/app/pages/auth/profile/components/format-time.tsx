export const formatTime = (created_at: string) => {
  const dateObj = new Date(created_at);

  const year = dateObj.getFullYear();
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const day = dateObj.getDate().toString().padStart(2, '0');
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const amOrPm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours > 12 ? hours - 12 : hours;
  return `${day}/${month}/${year}, ${formattedHours}:${minutes} ${amOrPm}`;
};
export const formatTimeFromCreatedAt = (created_at: string) => {
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

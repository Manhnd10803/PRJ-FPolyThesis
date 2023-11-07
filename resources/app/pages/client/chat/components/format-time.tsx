export const formatTime = (created_at: string) => {
  const dateObj = new Date(created_at);

  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes().toString().padStart(2, '0');
  const amOrPm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours > 12 ? hours - 12 : hours;
  return `${formattedHours}:${minutes} ${amOrPm}`;
};

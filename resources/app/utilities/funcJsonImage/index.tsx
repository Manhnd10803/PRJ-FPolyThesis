export const hideImages = (htmlContent: any) => {
  const doc = new DOMParser().parseFromString(htmlContent, 'text/html');
  const images = doc.querySelectorAll('img');

  images.forEach(img => {
    img.style.display = 'none'; // Ẩn ảnh
  });
  return doc.body.innerHTML;
};

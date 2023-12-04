export const getClassImages = (length: number) => {
  if (length >= 3) return 'grid-cols-2 grid-rows-2 grid-flow-col gap-3';
  return 'grid-cols-2 grid-flow-col gap-3';
};

export const formatImagesToRender = (imagesJson: string) => {
  const images: string | string[] = JSON.parse(imagesJson);

  const imageList = Array.isArray(images) ? images : [images];

  return {
    originalImages: imageList,
    newImages: imageList.length > 4 ? imageList.slice(0, 4) : imageList,
  };
};

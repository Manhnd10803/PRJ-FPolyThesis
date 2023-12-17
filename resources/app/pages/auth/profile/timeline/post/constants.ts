import { IComment } from '@/models/comment';
import { ILiker } from '@/models/like';

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

// get unique user comment

// Nếu có nhiều user thì chưa slice =))
export const tryConvertUniqueUser = (arr: IComment[]) => {
  let uniqueUser: IComment[] = [];
  arr.forEach(item => {
    if (!uniqueUser.find(user => user.user.id === item.user.id)) {
      uniqueUser.push(item);
    }
  });
  return uniqueUser;
};

// Nếu có nhiều user thì chưa slice =))
export const tryConvertUniqueLiker = (arr: ILiker[]) => {
  let uniqueUser: ILiker[] = [];
  arr.forEach(item => {
    if (!uniqueUser.find(user => user.user.id === item.user.id)) {
      uniqueUser.push(item);
    }
  });
  return uniqueUser;
};

import { validateExtension, validateLength, validateSize } from '@/utilities/functions/';
import axios from 'axios';
import toast from 'react-hot-toast';

// const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY;
// const apiSecret = import.meta.env.VITE_CLOUDINARY_API_SECRET;
const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '';
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

type folderType = 'default' | 'avatar' | 'cover' | 'post' | 'blog' | 'comment' | 'chat';

/**
 * Upload Image to Cloudinary Service
 * @param images list image to upload
 * @param folder upload to folder name
 * @returns list url of uploaded images
 */

const uploadImages = async (images: FileList | Array<File>, folder: folderType) => {
  const imageList = Array.from(images);

  if (!validateLength(images, 5)) {
    throw new Error('Tối đa 5 ảnh được tải lên');
  }

  const uploadPromises = imageList.map(async image => {
    try {
      if (!validateSize(image, 2 * 1024 * 1024)) {
        throw new Error('Kích thước ảnh tối đa 2MB');
      } else if (!validateExtension(image, ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'])) {
        throw new Error('Định dạng ảnh không được chấp nhận');
      }

      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', uploadPreset);
      formData.append('folder', folder);

      const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, formData);

      if (response.data.url) {
        return response.data.url;
      } else {
        throw new Error('Tải lên ảnh không thành công');
      }
    } catch (error) {
      throw error;
    }
  });

  try {
    const uploadedUrls = await axios.all(uploadPromises);
    return uploadedUrls;
  } catch (error: any) {
    toast.error(error.message);
    throw error;
  }
};

export const CloudiaryService = {
  uploadImages,
};

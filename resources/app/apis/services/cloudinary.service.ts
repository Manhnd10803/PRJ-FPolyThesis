import axios from 'axios';

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
  const uploadPromises = imageList.map(async image => {
    try {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', uploadPreset);
      formData.append('folder', folder);

      const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, formData);

      if (response.data.url) {
        return response.data.url;
      } else {
        throw new Error('Failed to upload image');
      }
    } catch (error) {
      throw error;
    }
  });

  try {
    const uploadedUrls = await axios.all(uploadPromises);
    return uploadedUrls;
  } catch (error) {
    throw error;
  }
};

export const CloudiaryService = {
  uploadImages,
};

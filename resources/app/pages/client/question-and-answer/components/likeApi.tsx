export const likeApi = async () => {
  await new Promise(resolve => setTimeout(resolve, 2000));

  return {
    success: true,
  };
};

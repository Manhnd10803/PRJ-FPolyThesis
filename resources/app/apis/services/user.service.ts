import httpRequest from '@/apis';

const getPublicContent = () => {
  return httpRequest.get('/test/all');
};

const UserService = {
  getPublicContent,
};

export default UserService;

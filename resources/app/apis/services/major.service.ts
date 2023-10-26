import { IMajors } from '@/models/major';
import httpRequest from '../axios-instance';
import { ApiConstants } from '../endpoints';

const getMajors = () => {
  return httpRequest.get<IMajors>(ApiConstants.MAJORS);
};

export const MajorService = { getMajors };

import { IMajors } from '@/models/major';
import httpRequest from '../axios-instance';
import { ApiConstants } from '../endpoints';

const getMajors = () => {
  return httpRequest.get<IMajors>(ApiConstants.MAJORS);
};
const getListMajorsRegister = () => {
  return httpRequest.get<Array<IMajors>>(ApiConstants.LIST_MAJORS_REGISTER);
};

export const MajorService = { getMajors, getListMajorsRegister };

import { IQandAs } from '@/models/qanda';
import httpRequest from '../axios-instance';
import { ApiConstants } from '../endpoints';

const createQandA = <T>(data: T) => {
  return httpRequest.post<IQandAs>(ApiConstants.CREATEASK, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

const getAllQandA = () => {
  return httpRequest.get<IQandAs>(ApiConstants.ALL_QANDA);
};

const getDetailQandA = (qaId: number) => {
  const url = `${ApiConstants.DETAIL_QANDA}/${qaId}`;
  return httpRequest.get<IQandAs>(url);
};

export const QandAService = { createQandA, getAllQandA, getDetailQandA };

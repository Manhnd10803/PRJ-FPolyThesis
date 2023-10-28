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

export const QandAService = { createQandA };

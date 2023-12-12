import { IQandAs } from '@/models/qanda';
import httpRequest from '../axios-instance';
import { ApiConstants } from '../endpoints';

const createQandA = <T>(data: T) => {
  return httpRequest.post<IQandAs>(ApiConstants.QANDA, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

const getListQandA = (type: string, major_id: string, pageParam: number) => {
  return httpRequest.get<any>(
    `${ApiConstants.QANDA}/${type}${major_id !== '' ? `/${major_id}` : ''}?page=${pageParam}`,
  );
};

const getDetailQandA = (qaId: number) => {
  const url = `${ApiConstants.DETAIL_QANDA}/${qaId}`;
  return httpRequest.get<IQandAs>(url);
};

const deleteQandA = async (qaId: number) => {
  const url = `${ApiConstants.QANDA}/${qaId}`;
  try {
    const response = await httpRequest.delete(url);
    return response;
  } catch (error) {
    throw new Error('Lỗi khi xóa câu hỏi');
  }
};

export const QandAService = {
  createQandA,
  getListQandA,
  getDetailQandA,
  deleteQandA,
};

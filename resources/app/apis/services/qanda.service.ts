import { IQandAs } from '@/models/qanda';
import httpRequest from '../axios-instance';
import { ApiConstants } from '../endpoints';

const createQandA = <T>(data: T) => {
  return httpRequest.post<IQandAs>(ApiConstants.CREATE_QANDA, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

const getAllQandA = () => {
  return httpRequest.get<IQandAs>(ApiConstants.ALL_QANDA);
};

const getAllQandAByMajor = (major_id: number) => {
  const url = `${ApiConstants.LIST_QANDA_BY_MAJOR}/${major_id}`;
  return httpRequest.get<IQandAs>(url);
};

const getAllMyQandA = () => {
  return httpRequest.get<IQandAs>(ApiConstants.LIST_MY_QANDA);
};

const getDetailQandA = (qaId: number) => {
  const url = `${ApiConstants.DETAIL_QANDA}/${qaId}`;
  return httpRequest.get<IQandAs>(url);
};

const UpdateQandA = async <T>(qaId: number, data: T) => {
  const url = `${ApiConstants.UPDATE_QANDA}/${qaId}`;
  try {
    const response = httpRequest.put<IQandAs>(url, data);
    return response;
  } catch (error) {
    throw new Error('Lỗi khi cập nhật câu hỏi');
  }
};

const deleteQandA = async (qaId: number) => {
  const url = `${ApiConstants.DELETE_QANDA}/${qaId}`;
  try {
    const response = await httpRequest.delete(url);
    return response;
  } catch (error) {
    throw new Error('Lỗi khi xóa câu hỏi');
  }
};

export const QandAService = {
  createQandA,
  getAllQandA,
  getDetailQandA,
  UpdateQandA,
  deleteQandA,
  getAllQandAByMajor,
  getAllMyQandA,
};

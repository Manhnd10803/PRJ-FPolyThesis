import httpRequest from '../axios-instance';
import { ApiConstants } from '../endpoints';

const getHistories = async (params: string, data: TimeRanges) => {
  return httpRequest.post<any>(`${ApiConstants.HISTORY}/${params}`, data);
};

const deleteHistory = async (id: number) => {
  return httpRequest.delete<any>(`${ApiConstants.DELETE_HISTORY}/${id}`);
};

export const HistoryService = {
  getHistories,
  deleteHistory,
};

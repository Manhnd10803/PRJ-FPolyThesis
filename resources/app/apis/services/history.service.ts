import httpRequest from '../axios-instance';
import { ApiConstants } from '../endpoints';

const getHistories = async (params: string, data: TimeRanges, pageParam: number) => {
  return httpRequest.post<any>(`${ApiConstants.HISTORY}/${params}?page=${pageParam}`, data);
};

const deleteHistory = async (id: number) => {
  return httpRequest.delete<any>(`${ApiConstants.DELETE_HISTORY}/${id}`);
};

const deleteAllHistoryByLogName = async (logName: string) => {
  return httpRequest.delete<any>(`${ApiConstants.DELETE_HISTORY_BY_LOG_NAME}/${logName}`);
};

export const HistoryService = {
  getHistories,
  deleteHistory,
  deleteAllHistoryByLogName,
};

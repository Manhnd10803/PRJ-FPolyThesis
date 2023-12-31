import httpRequest from '../axios-instance';
import { ApiConstants } from '../endpoints';

const getSearchEverything = (type: string, searchValue: string, pageParam: number) => {
  const queryParams = new URLSearchParams({
    search: searchValue,
    page: pageParam,
  });

  return httpRequest.get<any>(`${ApiConstants.SEARCH_EVERYTHING}/${type}?${queryParams}`);
};
export const SearchService = { getSearchEverything };

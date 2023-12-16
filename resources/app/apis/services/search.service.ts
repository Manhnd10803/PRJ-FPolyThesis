import httpRequest from '../axios-instance';
import { ApiConstants } from '../endpoints';

const getSearchEverything = (type: string, searchValue: string) => {
  const queryParams = new URLSearchParams({
    search: searchValue,
  });

  return httpRequest.get<any>(`${ApiConstants.SEARCH_EVERYTHING}/${type}?${queryParams}`);
};
export const SearchService = { getSearchEverything };

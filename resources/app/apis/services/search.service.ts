import httpRequest from '../axios-instance';
import { ApiConstants } from '../endpoints';

const getSearchEverything = <T>(type: string, searchValue: string) => {
  const queryParams = new URLSearchParams({
    search: searchValue,
  });

  return httpRequest.get(`${ApiConstants.SEARCH_EVERYTHING}/${type}?${queryParams}`);
};
export const SearchService = { getSearchEverything };

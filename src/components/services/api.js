import axios from 'axios';
const API_KEY = '38910037-843ad78f1fab8f9e210e82581';
const BASE_URL = 'https://pixabay.com/api/';

export const searchService = async (searchValue, currentPage) => {
  axios.defaults.params = {
    key: API_KEY,
    q: searchValue,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 12,
    page: currentPage,
  };

  const { data } = await axios.get(BASE_URL);
  return data;
};

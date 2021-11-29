import axios from 'axios';

const baseURL = 'http://localhost:9000/api/';

export const callAPi = async (endPoint, METHOD, HEADERS, PARAMS, DATA) => {
  const options = {
    url: `${baseURL}${endPoint}`,
    method: METHOD,
    headers: HEADERS || {},
    params: PARAMS || {},
    data: DATA || {},
  };
  try {
    const response = await axios(options);
    return response;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};

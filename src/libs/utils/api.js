import axios from 'axios';

export const callAPi = async (email, password) => {
  try {
    const response = await axios.post('http://localhost:9000/api/users/create-token', { email, password });
    const { data: { data } } = response;
    return data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};

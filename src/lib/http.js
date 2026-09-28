import axios from 'axios';

const http = axios.create({ timeout: 15000 });

export const errorText = (err) => {
  if (err.code === 'ECONNABORTED') return 'The server took too long to respond. Check that it is running.';
  if (err.code === 'ERR_NETWORK') return 'Cannot reach the server on port 5000.';
  return err.response?.data?.message || err.message || 'Something went wrong';
};

export default http;

import axios from 'axios';
import {store} from '../Redux'
// import { showErrorMsg } from '../utils'
//https://demo.appcrates.net/shoutout_latest/public/admin/login
const ROOT_URL = 'https://dev.92agents.com'; // staging server
// const ROOT_URL = 'https://826f1c23-be8e-4185-8bd9-01790a9c77cd.mock.pstmn.io'; // staging server
const BASE_URL = `${ROOT_URL}/api`;

const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

client.interceptors.request.use(
  async (config) => {
    const requestConfig = config;
    const { token } = store?.getState().userSession;

    if (token) {
      requestConfig.headers = {
        'Authorization': `Bearer ${token}`,
      };
    }
    return requestConfig;
  },
  (err) => {
    // showErrorMsg(err);
    return Promise.reject(err);
  },
);

export {
  ROOT_URL,
  BASE_URL,
  client,
};

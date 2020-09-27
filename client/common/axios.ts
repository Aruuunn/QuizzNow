import axios from 'axios';

import { baseURL } from '../config/domain';

const instance = axios.create(
  {
    baseURL
  }
)

export default instance;
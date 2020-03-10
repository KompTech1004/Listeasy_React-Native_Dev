import axios from 'axios';
import {DEFAULT_URL} from '../config/server';

export default axios.create({
  baseURL: DEFAULT_URL,
});

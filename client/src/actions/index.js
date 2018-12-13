import axios from 'axios';
import { FETCH_ITEMS } from './types';

export const fetchItems = () => async dispatch => {
  const res = await axios.get('/api/items');
  dispatch({ type: FETCH_ITEMS, payload: res.data })  
}
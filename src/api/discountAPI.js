import axios from 'axios';

export const checkDiscountIsValid = (name) => {
  return axios.get(`/discounts/check-discount/${name}`);
}
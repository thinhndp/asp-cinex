import axios from 'axios';

export const checkPromotion = (promotionCode) => {
  return axios.get(`/Promotions/CheckPromotion?promotionCode=${promotionCode}`);
}
import axios from 'axios';

export const buyTicket = (data) => {
  // data = {
  //   showtimeId: 'string',
  //   tickets: [
  //     {
  //       discountName: 'string',
  //       name: 'string,'
  //     }
  //   ]
  // }
  return axios.post('/tickets/BuyTickets', data);
}
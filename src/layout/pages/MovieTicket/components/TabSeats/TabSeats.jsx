import React, { useState, useEffect } from 'react';

import { useStoreState } from 'easy-peasy';
import { helper } from '../../../../../utils/helper';
import * as ticketAPI from '../../../../../api/ticketAPI';
import * as promotionAPI from '../../../../../api/promotionAPI';

import { Container, Spinner, InputGroup, FormControl, Button, Form } from 'react-bootstrap';
import FsLightbox from 'fslightbox-react';

import classes from './TabSeats.module.scss';

// const ROOM_INFO = {
//   totalRows: 10,
//   seatsPerRow: 18,
// }

// const SEAT_PRICE = 5;

function TabSeats(props) {
  const {showtime, seatsBooked} = props;

  const [seatsSelected, setSeatSelected] = useState([]);
  const [seatsBookedState, setSeatsBookedState] = useState([]);
  const [lightbox, setLightbox] = useState(false);
  const [isLoadingBuyTicket, setIsLoadingBuyTicket] = useState(false);
  const [isUsingCoupon, setIsUsingCoupon] = useState(false);
  const [isCouponFeedbackShowing, setCouponFeedbackShowing] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponFeedbackText, setCouponFeedbackText] = useState('Invalid');
  const [isCouponInEffect, setIsCouponInEffect] = useState(false);
  const [promotionCode, setPromotionCode] = useState(null);
  const [couponDiscountAmount, setCouponDiscountAmount] = useState(0);

  const [messageBuy, setMessageBuy] = useState('');


  const authState = useStoreState(state => state.auth.authState);

  useEffect(() => {
    setSeatsBookedState(seatsBooked)
  }, [seatsBooked])

  const onUsingCouponChanged = () => {
    // console.log(e.target.value);
    setIsUsingCoupon(!isUsingCoupon);
  }

  const onCouponCodeChange = (e) => {
    if (isCouponFeedbackShowing) {
      setCouponFeedbackShowing(false);
    }
    setCouponCode((e.target.value).toUpperCase());
    console.log(e.target.value);
  }

  const onCheckCouponClick = () => {
    if (isCouponInEffect) {
      setIsCouponInEffect(false);
      setCouponDiscountAmount(0);
      setPromotionCode(null);
    }
    // if (couponCode.length < 4 || couponCode.length > 6) {
    //   setCouponFeedbackShowing(true);
    //   setCouponFeedbackText('Must be from 4-6 characters')
    //   return;
    // }

    promotionAPI.checkPromotion(couponCode)
      .then((res) => {
        console.log(res.data);
        if (res.data && res.data.isActive === true) {
          setCouponFeedbackShowing(true);
          setCouponFeedbackText('Nice! What a bargain');
          setIsCouponInEffect(true);
          setCouponDiscountAmount(res.data.discountAmount);
          setPromotionCode(res.data.code);
        }
        else {
          setCouponFeedbackShowing(true);
          setCouponFeedbackText('Invalid or inactive Coupon');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const onClickSeat = (seatKey) => {
    if (seatsBookedState.includes(seatKey)) {
      return;
    }

    const tmpSeatsSelected = [...seatsSelected];
    const indexFound = seatsSelected.indexOf(seatKey);
    if (indexFound !== -1) {
      // Deselect
      tmpSeatsSelected.splice(indexFound, 1);
    } else {
      // Select
      tmpSeatsSelected.push(seatKey);
    }
    setSeatSelected(tmpSeatsSelected);
  }

  const onBuyTickets = () => {
    setMessageBuy(``);
    if (!authState.isLoggedIn) {
      // TODO: Display modal
      console.log('Need to Login');
      setMessageBuy(`You need to login to buy tickets.`);
      // window.location.href = '/login';
      return;
    }

    if (seatsSelected.length <= 0) {
      // TODO: Display modal
      setMessageBuy(`You haven't chosen any seat.`);
      return;
    }

    const data = {
      showtimeId: showtime.id,
      seats: seatsSelected.map(seatKey => {
        return {
          ticketType: 0,
          seat: seatKey,
          promotionCode: promotionCode,
        };
      })
    };
    setIsLoadingBuyTicket(true);
    ticketAPI.buyTicket(data)
      .then(response => {
        console.log(response);
        setMessageBuy(`Successful. Please check your email.`);
        const newSeatsBookedState = [...seatsBookedState, ...seatsSelected];
        setSeatsBookedState(newSeatsBookedState);
        setSeatSelected([]);
        setIsLoadingBuyTicket(false);
      })
      .catch(err => {
        console.log(err);
        setMessageBuy(`Something went wrong. Please try again.`);
        setIsLoadingBuyTicket(false);
      })
  }

  const getTotalPrice = () => {
    var total = seatsSelected.length * showtime.basePrice - seatsSelected.length * couponDiscountAmount;
    // if (isCouponInEffect && isUsingCoupon) {
    //   total *= (1 - couponDiscountAmount);
    // }
    return total;
  }

  const renderSeats = () => {
    let divsRow = [];

    for (let i = 0; i < showtime.room.totalRows; i++) {
      let divsSeat = [];
      const letter = (i + 10).toString(36).toUpperCase(); // Convert number to letter
      for (let j = 0; j < showtime.room.totalSeatsPerRow; j++) {
        const seatKey = j <= 9 ? `${letter}0${j}` : `${letter}${j}`

        let className = '';
        if (seatsBookedState.includes(seatKey)) {
          className = `far fa-square ${classes['seat-booked']}`;
        } else {
          className = seatsSelected.includes(seatKey) ? `fas fa-square ${classes['seat-selected']}` : `fas fa-square ${classes['seat-available']}`;
        }

        divsSeat.push(
          <i
            key={seatKey}
            className={className}
            onClick={() => onClickSeat(seatKey)}
          ></i>
        );
      }
      divsRow.push(
        <div key={`row${letter}`} className={classes['room-row']}>
          <div className={classes['room-row-before']}>{letter}</div>
          <div className={classes['room-row-seats']}>
            {divsSeat}
          </div>
          <div className={classes['room-row-after']}>{letter}</div>
        </div>
      );
    }

    return divsRow;
  }

  return (
    <Container>
      <div className="row" style={{width: '100%', color: 'white'}}>
        <div className="col-9">
          <div className={classes['movie-overview']}>
            <div className={classes['movie-overview-header']}>
              <div className={classes['movie-overview-header-title']}>
                {showtime.movie.title}
              </div>
              <div className={classes['movie-overview-header-subtitle']}>
                <span>
                  <i className="fab fa-imdb"></i> 9.9
                </span>
                <span>
                  <i className="far fa-clock"></i> {showtime.movie.runtime} min
                </span>
              </div>
            </div>
            <div className={classes['movie-overview-description']}>
              {showtime.movie.story}
            </div>
          </div>

          <div className="row" style={{marginBottom: 40}}>
            <div className="col-6 row">
              <div className="col">
                <div className={classes['showtime-key']}>
                  Theater no
                </div>
                <div className={classes['showtime-value']}>
                  {showtime.room.name}
                </div>
              </div>
              <div className="col">
                <div className={classes['showtime-key']}>
                  Date
                </div>
                <div className={classes['showtime-value']}>
                  {helper.getFormattedDate(new Date(showtime.startAt))}
                </div>
              </div>
              <div className="col">
                <div className={classes['showtime-key']}>
                  Show time
                </div>
                <div className={classes['showtime-value']}>
                  {helper.getFormattedTime(new Date(showtime.startAt))}
                </div>
              </div>
            </div>
            <div className={`col-6 row ${classes['legends']}`}>
              <div className={`col ${classes['legend']}`}>
                <i className={`fas fa-square ${classes['seat-available']}`}></i>
                <span>Available</span>
              </div>
              <div className={`col ${classes['legend']}`}>
                <i className={`far fa-square ${classes['seat-booked']}`}></i>
                <span>Booked</span>
              </div>
              <div className={`col ${classes['legend']}`}>
                <i className={`fas fa-square ${classes['seat-selected']}`}></i>
                <span>Selected</span>
              </div>
            </div>
          </div>

          {/* TODO: Component <Seats /> */}
          <div className={classes['screen']}>Screen</div>

          <div className={classes['room']}>

            {renderSeats()}
          </div>
          {/* End Component <Seats /> */}
        </div>
        <div className="col-3">
          <div className={classes['movie-poster-container']}>
            <img src={showtime.movie.poster} alt="movie poster" className={classes['movie-poster']} />
            <div className={classes['watch-trailer-container']}>
              <div className={classes['watch-trailer-button']} onClick={() => {setLightbox(!lightbox)}}>
                <i className="fas fa-play"></i>
              </div>
              <div className={classes['watch-trailer-text']} onClick={() => {setLightbox(!lightbox)}}>
                Watch Trailer
              </div>
            </div>
          </div>

          <div className={classes['seats-review']}>
            <div className={classes['seats-review-info']}>
              <div className={classes['seats-review-title']}>
                Your Seats
              </div>
              <div className={classes['seats-review-section']}>
                <div className={classes['seats-review-section-title']}>
                  {seatsSelected.length > 0 ? seatsSelected.join(', ') : 'None'}
                </div>
                <div className={classes['seats-review-section-quantity']}>
                  {seatsSelected.length}
                </div>
                <div className={classes['seats-review-section-price']}>${showtime.basePrice}</div>
              </div>
              <div className={classes['seats-review-total']}>
                <div className={classes['seats-review-total-title']}>
                  Total
                  {
                    isCouponInEffect && isUsingCoupon
                    ? <span
                        style={{
                          color: 'white',
                          fontSize: '16px'
                        }}
                      >(Using Coupon)</span>
                    : null
                  }
                </div>
                <div className={classes['seats-review-total-price']}>
                  ${ getTotalPrice() }
                </div>
              </div>
            </div>
            <div style={{marginBottom: 10}}>{messageBuy}</div>
            {/* TODO: Make this btn a component */}
            <div className={classes['add-to-cart-btn']} onClick={() => onBuyTickets()}>
              {
                isLoadingBuyTicket ?
                <Spinner animation="border" />
                :
                'Buy Ticket'
              }
            </div>
            <div className={classes['coupon-section']}>
              <div className={classes['title']}>
                {isUsingCoupon ? 'Input Coupon Code' : 'Use coupon'}
                <span style={{
                  display: 'flex',
                }}>
                  <Form.Check
                    custom
                    label=''
                    style={{
                      display: 'flex',
                    }}
                    checked={isUsingCoupon}
                    type="checkbox"
                    id='use-coupon-cb'
                    onChange={onUsingCouponChanged}
                  />
                </span>
              </div>
              {
                isUsingCoupon
                ? <div>
                  <InputGroup
                    className={"mb-3 " + classes['input']}
                  >
                    <FormControl
                      placeholder="Code"
                      aria-label="coupon"
                      aria-describedby="basic-addon2"
                      value={couponCode}
                      onChange={onCouponCodeChange}
                    />
                    <InputGroup.Append>
                      <Button
                        onClick={onCheckCouponClick}
                        variant="primary"
                      >Check</Button>
                    </InputGroup.Append>
                  </InputGroup>
                  <div
                    style={{
                      visibility: isCouponFeedbackShowing ? 'visible' : 'hidden',
                      color: isCouponInEffect ? '#28a745' : '#dc3545'
                    }}
                    className={classes['feedback-container']}
                  >{couponFeedbackText}</div>
                </div>
                : null
              }
            </div>
          </div>
        </div>
      </div>

      <FsLightbox
        toggler={ lightbox }
        sources={ [
          showtime.movie.trailer,
        ] }
      />
    </Container>
  )
}

export default TabSeats;
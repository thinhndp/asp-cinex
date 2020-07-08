import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

import * as showtimeAPI from '../../../api/showtimeAPI';

import TabSeats from './components/TabSeats/TabSeats';

import classes from './MovieTicket.module.scss';

function MovieTicket(props) {
  const [showtime, setShowtime] = useState(null);
  const [seatsBooked, setSeatsBooked] = useState([]); // ['A5', 'A6']
  // TODO: Forbid accessing directly by Url
  // var location = useLocation();

  // const movie = location.state.movie;
  // const showtime = location.state.showtime;

  useEffect(() => {
    getShowtimeDetail(props.match.params.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getShowtimeDetail = (id) => {
    showtimeAPI.getShowtimeDetailById(id)
      .then(response => {
        console.log(response);
        if (response.data) {
          // setShowtime(response.data.showtime);
          setShowtime(response.data.showtime);
          setSeatsBooked(response.data.seats);
          console.log(response.data);
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <div className={classes['page']}>
      {
        showtime ?
        <>
          <div
            className={classes['cover']}
            style={{zIndex: 1, background: `url(${showtime.movie.wallpapers && showtime.movie.wallpapers[0] ? showtime.movie.wallpapers[0] : 'https://wallpaperaccess.com/full/1679635.jpg'})`}}
          >
            <div className={classes['cover-opacity']}></div>
          </div>
          <div style={{position: 'relative', zIndex: 2, paddingTop: 200}}>
            <TabSeats showtime={showtime} seatsBooked={seatsBooked} />
          </div>
        </>
        :
        // TODO: Add Loading here instead
        <div style={{ backgroundColor: "#0b0f18", height: '100vh', display: 'flex' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <Spinner animation="grow" variant="light" style={{ width: '2.5rem', height: '2.5rem' }}/>
          </div>
        </div>
      }
    </div>
  )
}

export default MovieTicket;
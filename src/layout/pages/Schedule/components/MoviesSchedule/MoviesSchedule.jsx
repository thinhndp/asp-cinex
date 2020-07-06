import React, {useState, useEffect} from 'react';
import { Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import classes from './MoviesSchedule.module.scss';

import {helper} from '../../../../../utils/helper';
// import { mockScreenTypes, mockNowOnMovies, mockShowtimes } from '../../../../../mock-data';

const MoviesSchedule = (props) => {
  const { screenTypes, nowOnMovies, showtimes } = props;

  const [chosenScreenTypes, setChosenScreenTypes] = useState([]);
  const [moviesChosenDate, setMoviesChosenDate] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState(nowOnMovies);
  var history = useHistory();

  useEffect(() => {
    console.log(nowOnMovies);
    if (nowOnMovies.length > 0) {
      setFilteredMovies(nowOnMovies);
    }
  }, [nowOnMovies])

  useEffect(() => {
    setChosenScreenTypes(
      Array.from(screenTypes, (screenType) => (screenType.id))
    );
    const today = new Date();
    setMoviesChosenDate(
      Array.from(nowOnMovies, (movie) => ({ movieId: movie.id, chosenDate: today.getDate() }))
    );
    getShowtimesByMovieIdAndDate('movie_00', 21);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setFilteredMovies(nowOnMovies.filter(movie => isAMovieWithAChosenScreenType(movie, chosenScreenTypes)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosenScreenTypes]);

  const getDatesToDisplay = () => {
    const MS_IN_A_DAY = 86400000;
    const today = new Date();
    today.setHours(0,0,0,0);
    const datesToDisplay = [
      today,
      new Date(today.getTime() + MS_IN_A_DAY * 1),
      new Date(today.getTime() + MS_IN_A_DAY * 2),
      new Date(today.getTime() + MS_IN_A_DAY * 3),
      new Date(today.getTime() + MS_IN_A_DAY * 4),
    ];
    return datesToDisplay;
  }

  const getShowtimesByMovieIdAndDate = (movieId, date) => {
    // TODO: Đưa cho hoàng tử Chăm pa xử lí ở backend
    var showtimeByScreenType = Array.from(screenTypes, (screenType => ({ screenType: screenType, showtimes: [] })));
    for (var showtime of showtimes) {
      const showDate = new Date(showtime.startAt);
      if (showtime.movie.id === movieId && showDate.getDate() === date) {
        // eslint-disable-next-line no-loop-func
        const screenTypeIndex = showtimeByScreenType.findIndex(st => st.screenType.name === showtime.screenType.name);
        showtimeByScreenType[screenTypeIndex].showtimes.push(showtime);
      }
    }
    showtimeByScreenType = showtimeByScreenType.filter(st => st.showtimes.length > 0);
    // console.log(showtimeByScreenType);
    return showtimeByScreenType;
  }

  const getChosenDateOfMovie = (movieId) => {
    // console.log(movieId);
    const index = moviesChosenDate.findIndex(chosen => {
      return chosen.movieId === movieId
    });
    // console.log(index);

    return moviesChosenDate[index].chosenDate;
  }

  const isChosenScreenType = (screenType) => {
    return chosenScreenTypes.findIndex(chosen => chosen === screenType.id) > -1;
  }

  const isAllScreenTypesChosen = () => {
    return chosenScreenTypes.length === screenTypes.length;
  }

  const isChosenDateOfMovie = (movieId, date) => {
    const movieIndex = moviesChosenDate.findIndex(chosen => chosen.movieId === movieId);
    // console.log(date === moviesChosenDate[movieIndex].chosenDate);
    if (movieIndex !== -1) {
      return date === moviesChosenDate[movieIndex].chosenDate;
    }

    return false;
  }

  const isAMovieWithAChosenScreenType = (movie, screenTypes) => {
    // const movie = nowOnMovies.find(movie => movie.id === movieId);
    // console.log('--------------------');
    // console.log(screenTypes);
    // console.log(Array.from(movie.screenTypes, (screenType => screenType.id)));
    // console.log(screenTypes.some(screenType => Array.from(movie.screenTypes, (screenType => screenType.id)).includes(screenType)));
    // console.log('--------------------');
    return screenTypes.some(screenType => Array.from(movie.screenTypes, (screenType => screenType.id)).includes(screenType));
  }


  const onScreenTypeButtonClick = (screenType) => {
    if (isChosenScreenType(screenType)) {
      if (chosenScreenTypes.length <= 1) {
        return;
      }
      setChosenScreenTypes(chosenScreenTypes.filter(chosen => chosen !== screenType.id));
    }
    else {
      setChosenScreenTypes([ ...chosenScreenTypes, screenType.id ]);
    }
    // setFilteredMovies(nowOnMovies.filter(movie => isAMovieWithAChosenScreenType(movie, chosenScreenTypes)));
  }

  const onAllScreenTypeClick = () => {
    setChosenScreenTypes(
      Array.from(screenTypes, (screenType) => (screenType.id))
    );
    setFilteredMovies(nowOnMovies)
  }

  const onDateClick = (movieId, date) => {
    setMoviesChosenDate(
      moviesChosenDate.map(chosen => (
        chosen.movieId === movieId
        ? { ...chosen, chosenDate: date }
        : chosen
      ))
    )
  }

  const onMovieClick = (movie) => {
    history.push(
      `/movie/${movie.id}`,
      {
        movie: movie
      }
    );
  }

  const onShowtimeClick = (movie, showtime) => {
    history.push(`/movie-ticket/${showtime.id}`);
  }

  const renderScreenTypeButton = (screenType) => {
    return (
      <div 
        key={screenType.id}
        className={ 
          isChosenScreenType(screenType)
          ? classes['screen-type-button-active'] 
          : classes['screen-type-button']
        }
        onClick={onScreenTypeButtonClick.bind(this, screenType)}
      >{screenType.name}
      </div>
    );
  }
    
  const renderScreenTypes = (screenTypes) => {
    return (
      <div className={classes['screen-types']}>
      <div 
        className={ 
          isAllScreenTypesChosen()
          ? classes['screen-type-button-active'] 
          : classes['screen-type-button']
        }
        onClick={onAllScreenTypeClick}
      >All
      </div>
        {screenTypes.map(screenType => (
          renderScreenTypeButton(screenType)
        ))}
      </div>
    );
  }

  const renderMovie = (movie) => {
    const showtimes = moviesChosenDate.length > 0 
          ? getShowtimesByMovieIdAndDate(movie.id, getChosenDateOfMovie(movie.id))
          : [];
    return (
      <div className={classes['movie-container']}>
        <div className={classes['movie-info-and-display-dates']}>
          <div className={classes['poster-container']}>
            <img
              className={classes["poster"]}
              src={movie.poster}
              alt="movie-poster"
              onClick={onMovieClick.bind(this, movie)}
            />
          </div>
          <div className={classes['info-and-display-dates']}>
            <div
              className={classes['info']}
              onClick={onMovieClick.bind(this, movie)}
            >
              <div className={classes['title']}>{movie.title}</div>
              <div className={classes['sub-info']}>{movie.runtime} min  |  {helper.getFormattedGenresString(movie.genres)}</div>
            </div>
            <div className={classes['display-dates']}>
              {getDatesToDisplay().map(date => (
                <div key={date.toISOString()} className={classes['date-container']}>
                  <div 
                    className={
                      classes['date-clickable'] +
                      (chosenScreenTypes.length > 0 && isChosenDateOfMovie(movie.id, date.getDate())
                      ? (' ' + classes['date-clickable-active'])
                      : '')
                    }
                    onClick={onDateClick.bind(this, movie.id, date.getDate())}
                  >
                    <div className={classes['day-of-week']}>{helper.getDayOfWeekName(date.getDay())}</div>
                    <div className={classes['day-of-month']}>{date.getDate()}</div>
                    <div className={classes['month']}>{helper.getMonthName(date.getMonth())}</div>
                  </div>
                  <div className={classes['date-foot']}>
                    { chosenScreenTypes.length > 0 && isChosenDateOfMovie(movie.id, date.getDate())
                      ? <div className={classes['foot-circle']}></div>
                      : <div className={classes['foot-line']}></div>
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {
          moviesChosenDate.length > 0
          ? (
            <div className={classes['screen-type-available']}>
              {showtimes.map((showtimeByScreentype, index) => (
                <div className={classes['show-time-by-screen-type']}>
                  <div className={classes['screen-type-container']}>
                    {showtimeByScreentype.screenType.name}
                  </div>
                  <div className={classes['showtimes-container']}>
                    {helper.sortShowtimesByStartAt(showtimeByScreentype.showtimes).map(showtime => (
                      <div
                        className={classes['showtime']}
                        onClick={onShowtimeClick.bind(this, movie, showtime)}
                      >
                        {helper.getFormattedTime(new Date(showtime.startAt))}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {showtimes.length <= 0
                ? (
                  <div className={classes['no-showtime']}>
                    No Showtime on the chosen Date
                  </div>
                )
                : null
              }
            </div>
          )
          : null
        }
      </div>
    );
  }

  return (
    <Container className={classes['container']}>
      {/* <div className={classes['header']}>
        <div className={classes['big-text']}>
          Theater
        </div>
        <div className={classes['fading-line']}></div>
        <div className="row">
          <div className="col-5">
            <div className={classes['label-text']} style={{marginBottom: 10}}>Choose a Theater:</div>
            <CustomSelect placeholder="Select Theater" selectWidth="100%" options={[{label: 'Mot', value: 'mot'}]} />
            <div className={classes['theater-info-card']}>
              <div style={{fontSize: 30, textTransform: 'uppercase', fontWeight: 'bold'}}>Cinex New York City</div>
              <div style={{fontSize: 22}}>Address: 136 Metropolitan Ave, Brooklyn, NY 11249-3952</div>
              <div style={{fontSize: 22}}>Hotline: 028 7300 9999</div>
            </div>
          </div>
        </div>
      </div> */}

      <div className={classes['header']} style={{marginTop: 100}}>
        <div className={classes['big-text']}>
          Schedule
        </div>
        <div className={classes['fading-line']}></div>
        {renderScreenTypes(screenTypes)}
      </div>

      <div className={classes['movies']}>
        { filteredMovies.map(movie => (
          renderMovie(movie)
        )) }
      </div>
    </Container>
  );
}

export default MoviesSchedule;
import React, { useState, useEffect } from 'react';

import * as clusterAPI from '../../../../../api/clusterAPI';
import * as showtimeAPI from '../../../../../api/showtimeAPI';
import * as screenTypeAPI from '../../../../../api/screenTypeAPI';
import { helper } from '../../../../../utils/helper';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import { Button, Modal, Spinner } from 'react-bootstrap';
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdPhotoLibrary } from 'react-icons/md';
import AspectRatio from 'react-aspect-ratio';
import Lightbox from 'react-image-lightbox';

import './MovieDetail.css';
import classes from './MovieDetail.module.scss';
import TheaterSelectSection from '../../../Schedule/components/TheaterSelectSection/TheaterSelectSection';

const MovieDetail = (props) => {
  const [clusters, setClusters] = useState([]);
  const [screenTypes, setScreenTypes] = useState([]);
  const [isLoadingShowtimes, setIsLoadingShowtimes] = useState(false);
  const [showtimes, setShowtimes] = useState([]);
  const [chosenDate, setChosenDate] = useState(0)
  // TODO: Make modal a seperated component
  const [showModal, setShowModal] = useState(false);
  const [lightboxState, setLightboxState] = useState({ photoIndex: 0, isOpen: false });

  var history = useHistory();
  const { movie } = props;
  const galleryImages = movie.wallpapers ? [ ...movie.wallpapers, movie.poster ] : [ movie.poster ];

  // const showtimes = useStoreState(state => state.showtimes.items);
  // const screenTypes = useStoreState(state => state.screenTypes.items);

  useEffect(() => {
    console.log(movie);
    getClusters();
    getScreenTypes();
    // getShowtimesByMovieAndCluster(movie.id);

    const today = new Date();
    setChosenDate(today.getDate());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getClusters = () => {
    clusterAPI.getAllClusters()
      .then(response => {
        console.log(response);
        setClusters(response.data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const getScreenTypes = () => {
    screenTypeAPI.getAllScreenTypes()
      .then(response => {
        console.log(response);
        setScreenTypes(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  const getShowtimesByMovieAndCluster = (movieId, clusterId) => {
    setIsLoadingShowtimes(true);
    showtimeAPI.getShowtimesByMovieAndCluster(movieId, clusterId)
      .then(response => {
        console.log(response);
        setShowtimes(response.data);
        setIsLoadingShowtimes(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoadingShowtimes(false);
      });
  }

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

  const getMovieShowtimeByDate = (date) => {
    var showtimeByScreenType = Array.from(screenTypes, (screenType => ({ screenType: screenType, showtimes: [] })));
    for (var showtime of showtimes) {
      const showDate = new Date(showtime.startAt);
      if (showtime.movie.id === movie.id && showDate.getDate() === date) {
        // eslint-disable-next-line no-loop-func
        const screenTypeIndex = showtimeByScreenType.findIndex(st => st.screenType.name === showtime.screenType.name);
        showtimeByScreenType[screenTypeIndex].showtimes.push(showtime);
      }
    }
    showtimeByScreenType = showtimeByScreenType.filter(st => st.showtimes.length > 0);
    return showtimeByScreenType;
  }

  const isChosenDate = (date) => {
    return date === chosenDate;
  }

  const onDateClick = (date) => {
    setChosenDate(date)
  }

  const onShowtimeClick = (showtime) => {
    history.push(
      `/movie-ticket/${showtime.id}`,
      {
        movie: movie,
        showtime: showtime
      }
    );
  }

  const renderShowtimesByDate = () => {
    if (isLoadingShowtimes === true) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, height: 600 }}>
          <Spinner animation="grow" variant="light" style={{ width: '2.5rem', height: '2.5rem' }}/>
        </div>
      );
    }

    if (getMovieShowtimeByDate(chosenDate).length <= 0) {
      return (
        <div className={classes['no-showtime']}>
          No Showtime on the chosen Date
        </div>
      );
    }

    return getMovieShowtimeByDate(chosenDate)
      .map((showtimeByScreentype, index) => (
        <div key={`showtimeByScreentype${index}`} className={classes['show-time-by-screen-type']}>
          <div className={classes['screen-type-container']}>
            {showtimeByScreentype.screenType.name}
          </div>
          <div className={classes['showtimes-container']}>
            {helper.sortShowtimesByStartAt(showtimeByScreentype.showtimes).map(showtime => (
              <div
                key={showtime.id}
                className={classes['showtime']}
                onClick={onShowtimeClick.bind(this, showtime)}
              >
                {moment(showtime.startAt).format('h:mm A z')}
              </div>
            ))}
          </div>
        </div>
      ));
  }
  
  return (
    <div className={classes['container']}>
      {lightboxState.isOpen && (
        <Lightbox
          style={{ zIndex: 9999999 }}
          mainSrc={galleryImages[lightboxState.photoIndex]}
          nextSrc={galleryImages[(lightboxState.photoIndex + 1) % galleryImages.length]}
          prevSrc={galleryImages[(lightboxState.photoIndex + galleryImages.length - 1) % galleryImages.length]}
          onCloseRequest={() => setLightboxState({ ...lightboxState, isOpen: false })}
          onMovePrevRequest={() =>
            setLightboxState({
              ...lightboxState,
              photoIndex: (lightboxState.photoIndex + galleryImages.length - 1) % galleryImages.length,
            })
          }
          onMoveNextRequest={() =>
            setLightboxState({
              ...lightboxState,
              photoIndex: (lightboxState.photoIndex + 1) % galleryImages.length,
            })
          }
        />
      )}
      {
        movie ?
        <>

          <div className={classes['title-and-screentypes']}>
            <div className={classes['title']}>
              {movie.title}
            </div>
            {/* <div className={classes['screentypes']}>
              { movie.screenTypes.map( type => (
                <div className={classes["type"]}>
                  {type}
                </div>
              ) ) }
            </div> */}
          </div>
          <hr className={classes["line"]}/>
          <div className={classes['poster-and-movie-infos']}>
            <div className={classes['poster-and-buttons']}>
              <img className={classes["poster"]} src={movie.poster} alt="movie-poster"/>
              {/* <Button className={classes['small-button']} variant="dark" size="sm" block>Add To List</Button>
              <Button className={classes['small-button']} variant="dark" size="sm" block>Favorite</Button> */}
              <Button
                className={classes['buy-ticket-button']}
                variant="primary"
                size= "lg"
                onClick={() => setShowModal(true)}
                block
              >Buy Ticket</Button>
            </div>
            <div className={classes['movie-infos']}>
              {/* <div>Batman v Superman: Dawn of Justice</div> */}
              <div className={classes['screentypes']}>
              { movie.screenTypes.map( type => (
                <div key={type.id} className={classes["type"]}>
                  {type.name}
                </div>
              ) ) }
            </div>
              <hr className={classes["line"]}/>
              <div className={classes['rating-length-genres']}>
                {(movie.rated ? movie.rated.name : 'Not Rated') + " | " + movie.runtime + " min | " + helper.getFormattedGenresString(movie.genres)}
              </div>
              <hr className={classes["line"]}/>
              <div className={classes['details-and-cast']}>
                <div className={classes['details']}>
                  <div className={classes['section-name-text']}>Details</div>
                  <div className={classes['normal-text']}>Director: <span className={classes['sub-text']}>{movie.directors[0]}</span></div>
                  {/* <div className={classes['normal-text']}>Writers: <span className={classes['sub-text']}>{movie.writers}</span></div> */}
                  <div className={classes['normal-text']}>Country: <span className={classes['sub-text']}>{movie.country}</span></div>
                  {/* <div className={classes['normal-text']}>Language: <span className={classes['sub-text']}>{movie.language}</span></div> */}
                  <div className={classes['normal-text']}>Language: <span className={classes['sub-text']}>English</span></div>
                  <div className={classes['normal-text']}>Release Date: <span className={classes['sub-text']}>{moment(movie.releasedAt).format('DD/MM/YYYY')}</span></div>
                </div>
                <div className={classes['cast']}>
                  <div className={classes['section-name-text']}>Cast</div>
                  { movie.actors.map((actor, index) => (
                    <div key={`actor${index}`} className={classes['normal-text'] + " " + classes['actor-name']}>
                      {/* <span><img className={classes['actor-img']} src={actor.imgUrl} alt="actor-img"/></span> */}
                      <span><div style={{ backgroundImage: "url(" + actor.avatar + ")" }} className={classes['actor-img']}></div></span>
                      {/* <span className={classes['actor-img']}></span> */}
                      {actor.name}  
                    </div>
                  )) }
                  <div
                    className={classes['sub-text'] + " " + classes['see-more']}
                    onClick={() => { window.open("https://www.imdb.com/", "_blank") }}
                  ><IoMdAddCircleOutline size={24} className={classes['icon']}/>See more</div>
                </div>
                <div className={classes['gallery']}>
                  <div className={classes['section-name-text']}>Gallery</div>
                  <AspectRatio
                    ratio='1.61803398875'
                    style={{
                      maxWidth: '200px',
                      backgroundImage: `url(${galleryImages[0]})`,
                      backgroundSize: 'cover'
                    }}
                  >
                    <div
                      className={classes['gallery-overlay-box']}
                      onClick={() => setLightboxState({ ...lightboxState, isOpen: true })}
                    >
                      <MdPhotoLibrary className={classes['icon']}/>
                    </div>
                  </AspectRatio>
                </div>
              </div>
              <hr className={classes["line"]}/>
              <div className={classes['storyline']}>
                <div className={classes['section-name-text']}>Storyline</div>
                <div className={classes['normal-text']}>{movie.story}</div>
              </div>
            </div>
          </div>
          <Modal
            size="lg"
            show={showModal}
            onHide={() => setShowModal(false)}
            aria-labelledby="example-modal-sizes-title-lg"
            centered
            className='my-modal'
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-lg">
                The choice is yours
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <TheaterSelectSection
                clusters={clusters}
                onClusterChange={(clusterId) => {
                  console.log(clusterId);
                  getShowtimesByMovieAndCluster(movie.id, clusterId);
                }}
              />

              <div className={classes['display-dates']}>
                    {getDatesToDisplay().map((date, index) => (
                      <div key={`date${index}`} className={classes['date-container']}>
                        <div 
                          className={
                            classes['date-clickable'] +
                            (isChosenDate(date.getDate())
                            ? (' ' + classes['date-clickable-active'])
                            : '')
                          }
                          onClick={onDateClick.bind(this, date.getDate())}
                        >
                          <div className={classes['day-of-week']}>{helper.getDayOfWeekName(date.getDay())}</div>
                          <div className={classes['day-of-month']}>{date.getDate()}</div>
                          <div className={classes['month']}>{helper.getMonthName(date.getMonth())}</div>
                        </div>
                        <div className={classes['date-foot']}>
                          { isChosenDate(date.getDate())
                            ? <div className={classes['foot-circle']}></div>
                            : <div className={classes['foot-line']}></div>
                          }
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className={classes['screen-type-available']}>
                    {/* {getMovieShowtimeByDate(chosenDate).map((showtimeByScreentype, index) => (
                      <div key={`showtimeByScreentype${index}`} className={classes['show-time-by-screen-type']}>
                        <div className={classes['screen-type-container']}>
                          {showtimeByScreentype.screenType.name}
                        </div>
                        <div className={classes['showtimes-container']}>
                          {helper.sortShowtimesByStartAt(showtimeByScreentype.showtimes).map(showtime => (
                            <div
                              key={showtime.id}
                              className={classes['showtime']}
                              onClick={onShowtimeClick.bind(this, showtime)}
                            >
                              {moment(showtime.startAt).format('h:mm A z')}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    {getMovieShowtimeByDate(chosenDate).length <= 0
                      ? (
                        <div className={classes['no-showtime']}>
                          No Showtime on the chosen Date
                        </div>
                      )
                      : null
                    } */}

                    {renderShowtimesByDate()}
                  </div>
            </Modal.Body>
          </Modal>
        </>
        :
        <div>Loading</div>
      }
    </div>
  );
}

export default MovieDetail;
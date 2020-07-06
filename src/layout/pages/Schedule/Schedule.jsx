import React, { useState, useEffect } from 'react';
import { Spinner, Container } from 'react-bootstrap';

import * as clusterAPI from '../../../api/clusterAPI';
import * as movieAPI from '../../../api/movieAPI';
import * as screenTypeAPI from '../../../api/screenTypeAPI';
import * as showtimeAPI from '../../../api/showtimeAPI';

import MovieShowcase from './components/MovieShowcase/MovieShowcase';
import MoviesSchedule from './components/MoviesSchedule/MoviesSchedule';
import TheaterSelectSection from './components/TheaterSelectSection/TheaterSelectSection';
// import { useStoreState } from 'easy-peasy';

import classes from './Schedule.module.scss';
// import { mockScreenTypes, mockNowOnMovies, mockShowtimes } from '../../../mock-data';

const Schedule = () => {
  const [isLoadingNowOnMovies, setIsLoadingNowOnMovies] = useState(false); // TODO: Remove this as this is a bit redundant
  const [isLoadingShowtime, setIsLoadingShowtime] = useState(false);
  const [nowOnMovies, setNowOnMovies] = useState([]);
  const [screenTypes, setScreenTypes] = useState([]);
  const [clusters, setClusters] = useState([]);
  const [showtimes, setShowtimes] = useState([]);

  // const screenTypes = useStoreState(state => state.screenTypes.items);
  // const nowOnMovies = useStoreState(state => state.nowOnMovies.items);
  // const showtimes = useStoreState(state => state.showtimes.items);
  
  useEffect(() => {
    getNowOnMovies();
    getScreenTypes();
    getClusters();
    // getShowtimes();
  }, []);

  const getClusters = () => {
    clusterAPI.getAllClusters()
      .then(response => {
        setClusters(response.data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const getNowOnMovies = () => {
    setIsLoadingNowOnMovies(true);
    movieAPI.getAllNowOnMovies()
      .then(response => {
        setNowOnMovies(response.data);
        setIsLoadingNowOnMovies(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoadingNowOnMovies(false);
      })
  }
  
  const getScreenTypes = () => {
    screenTypeAPI.getAllScreenTypes()
      .then(response => {
        setScreenTypes(response.data);
      })
      .catch(err => {
        console.log(err);
      })
  }
  
  // const getShowtimes = () => {
  //   showtimeAPI.getAllShowtimes()
  //     .then(response => {
  //       setShowtimes(response.data);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     })
  // }

  const getShowtimesByClusterId = (clusterId) => {
    setIsLoadingShowtime(true);
    showtimeAPI.getShowtimesByClusterId(clusterId)
      .then(response => {
        setIsLoadingShowtime(false);
        console.log(response.data);
        setShowtimes(response.data);
      })
      .catch(err => {
        setIsLoadingShowtime(false);
        console.log(err);
      })
  }

  return (nowOnMovies && screenTypes)
    ? (
      <div style={{ backgroundColor: '#0b0f18' }}>
        <div className={classes['fade-in']}>
          <MovieShowcase nowOnMovies={nowOnMovies} />
          <Container style={{ marginTop: -400 }}>
            <div className={classes['big-text']}>
              Theater
            </div>
            <div className={classes['fading-line']}></div>
            <div style={{ width: 800 }}>
              <TheaterSelectSection
                clusters={clusters}
                onClusterChange={(clusterId) => {
                  console.log(clusterId);
                  getShowtimesByClusterId(clusterId);
                }}
              />
            </div>
          </Container>
          {
            // nowOnMovies.length > 0 && screenTypes.length > 0 && showtimes ?
            isLoadingNowOnMovies !== true && isLoadingShowtime !== true ?
            <MoviesSchedule screenTypes={screenTypes} nowOnMovies={nowOnMovies} showtimes={showtimes} />
            :
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, height: 600 }}>
              <Spinner animation="grow" variant="light" style={{ width: '2.5rem', height: '2.5rem' }}/>
            </div>
          }
        </div>
      </div>
    )
    : (
      <div style={{ backgroundColor: "#0b0f18", height: '100vh', display: 'flex' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <Spinner animation="grow" variant="light" style={{ width: '2.5rem', height: '2.5rem' }}/>
        </div>
      </div>
    )
  ;
}

export default Schedule;
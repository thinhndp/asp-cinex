import React, { useEffect, useState } from 'react';

import * as movieAPI from '../../../api/movieAPI';

import YouTube from 'react-youtube';
import { useHistory  } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

import Section from './components/Section/Section';
import Showcase from './components/Showcase/Showcase';
import UnreleasedSection from './components/UnreleasedSection/UnreleasedSection';

import classes from './Home.module.scss';

// import unreleaseMovies from './unreleased-mock';
// import { mockMovies, mockUpcomingMovies } from '../../../mock-data';
import { helper } from '../../../utils/helper';

function Home(props) {
  // const [toggler, setToggler] = useState(false);
  const [nowOnMovies, setNowOnMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  // const nowOnMovies = useStoreState(state => state.nowOnMovies.items);
  // const upcomingMovies = helper.paginate(useStoreState(state => state.upcomingMovies.items), 5, 1);

  let history = useHistory();
  const opts = {
    height: '390',
    width: '640',
    playerVars: { // https://developers.google.com/youtube/player_parameters
      autoplay: 0
    }
  };

  useEffect(() => {
    getNowOnMovies();
    getUpcomingMovies();
  }, []);

  const getNowOnMovies = () => {
    movieAPI.getAllNowOnMovies()
      .then(response => {
        console.log(response);
        setNowOnMovies(response.data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const getUpcomingMovies = () => {
    movieAPI.getAllUpcomingMovies()
      .then(response => {
        console.log(response);
        setUpcomingMovies(response.data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const _onReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  const onMovieClick = (movie) => {
    // props.router.push({
    //   pathname: `/movie/${movie.id}`,
    //   state: {
    //     movie: movie
    //   }
    // })
    history.push(`/movie/${movie.id}`);
  }

  const renderNowOnSection = () => {
    return nowOnMovies.length > 0
      ? (
        <div className={'row ' + classes['movie-list-content-container'] + ' ' + classes['fade-in']}>  
          {
            nowOnMovies.map(movie => (
              <div
                key={movie.id}
                className={'col-3 ' + classes['movie-list-content-item']}
              >
                <img
                  className={classes['movie-list-content-item-img']}
                  src={movie.poster}
                  alt="movie poster"
                  onClick={onMovieClick.bind(this, movie)}
                />
                <div className={classes['movie-list-content-item-title']} onClick={onMovieClick.bind(this, movie)}>{movie.title}</div>
              </div>
            ))
          }
        </div>
      )
      : (
        <div className={classes['child-centering']}>
          <Spinner animation="grow" variant="light" style={{ width: '2.5rem', height: '2.5rem' }}/>
        </div>
      );
  }

  const renderTrailerSection = () => {
    return nowOnMovies.length > 0
      ? (
        <div className={classes['trailer-container']}>
          <YouTube
            videoId={helper.getYouTubeID(helper.getOneTrailer(nowOnMovies))}
            opts={opts}
            onReady={_onReady}
          />
        </div>
      )
      : (
        <div className={classes['child-centering']}>
          <Spinner animation="grow" variant="light" style={{ width: '2.5rem', height: '2.5rem' }}/>
        </div>
      );
  }

  return (
    <div className={classes['home']}>
      <Showcase movies={nowOnMovies}/>

      <Section title="Now on">
        {renderNowOnSection()}
      </Section>

      <Section title="Trailer">
        {renderTrailerSection()}
      </Section>

      <UnreleasedSection movies={helper.paginate(helper.sortMoviesByReleaseDate(upcomingMovies), 5, 1)} />
    </div>
  )
}

export default Home;
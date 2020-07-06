import React, { useState, useEffect } from 'react';
import * as movieAPI from '../../../api/movieAPI';
import MovieShowcase from './components/MovieShowcase/MovieShowcase'; 
import MovieDetail from './components/MovieDetail/MovieDetail';
import NowPlayingMovies from './components/NowPlayingMovies/NowPlayingMovies';
import { Container, Spinner } from 'react-bootstrap';

// import mockMovie from './mock-movie';
// import mockMovies from '../../../mock-data';
// import { nowPlayingMovies } from './mock-movie';
// import { mockNowOnMovies, mockMovies } from '../../../mock-data';

import classes from './Movie.module.scss';

const Movie = (props) => {
  // let location = useLocation();
  const [movie, setMovie] = useState(null);
  const [nowOnMovies, setNowOnMovies] = useState(null);

  // const movies = useStoreState(state => state.movies.items);
  // const nowOnMovies = useStoreState(state => state.nowOnMovies.items);

  // const { id } = useParams();
  // const movie = movies.find(movie => movie.id === id);

  useEffect(() => {
    getMovieDetail(props.match.params.id);
    getNowOnMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const getMovieDetail = (id) => {
    movieAPI.getMovieDetailById(id)
      .then(response => {
        console.log(response);
        setMovie(response.data);
      })
      .catch(err => {
        console.log(err);
      })
  }

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

  // console.log(location. state.movie);
  // return (
  //   <div className={classes['movie-page']} style={{ backgroundColor: "#0b0f18" }}>
  //     {movie ? <MovieShowcase movie={movie}/> : null}
  //     <Container>
  //       {movie ? <MovieDetail movie={movie}/> : null}
  //       {nowOnMovies ? <NowPlayingMovies movies={nowOnMovies}/> : null}
  //     </Container>
  //   </div>
  // );
  return movie 
    ? (
      <div style={{ backgroundColor: "#0b0f18" }}>
        <div className={classes['movie-page'] + ' ' + classes['fade-in']}>
          <MovieShowcase movie={movie}/>
          <Container>
            <MovieDetail movie={movie}/>
            <NowPlayingMovies movies={nowOnMovies}/>
          </Container>
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

export default Movie;
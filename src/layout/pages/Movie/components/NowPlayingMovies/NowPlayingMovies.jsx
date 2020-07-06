import React, {useState} from 'react';
// import { useHistory } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

import classes from './NowPlayingMovies.module.scss';

import { helper } from '../../../../../utils/helper';

const NowPlayingMovies = (props) => {
  const [ currentPage, setCurrentPage ] = useState(1);
  
  // var history = useHistory();
  const { movies } = props;
  const PAGE_SIZE = 5;
  const MOVIES_COUNT = movies ? movies.length : 0;
  const PAGES_TO_DISPLAY = Math.ceil(MOVIES_COUNT / PAGE_SIZE);
  const pageNumberArr = [...Array(PAGES_TO_DISPLAY + 1).keys()].slice(1);

  const onMovieClick = (movie) => {
    // history.push(
    //   `/movie/${movie.id}`,
    //   {
    //     movie: movie
    //   }
    // );
    window.location.href = `/movie/${movie.id}`
  }

  const onChangePageClick = (page) => {
    setCurrentPage(page);

    //TODO: Use react-transition-group instead
    for (var i = 0; i < PAGE_SIZE; i++) {
      const element = document.getElementById(`movie${i}`);
      if (!element) {
        break;
      }
      console.log(element);
      element.classList.remove(classes['fade-in']);
      void element.offsetWidth;
      element.classList.add(classes['fade-in']);
    }
  }

  // console.log(movieList);
  return (
    <div className={classes['container']}>
      <hr className={classes['line']}/>
      <div className={classes['section-name-text']}>
        <span><img className={classes['icon'] + " " + classes['invert']} src={'https://png.pngtree.com/svg/20141212/c596a7549c.png'} alt="cinema-icon"/></span>
        In Theater
      </div>
      <hr className={classes['line']}/>
      { movies 
        ? (
          <div>
            <div id="movie-container" className={classes['now-playing-movies-container']}>
              { helper.paginate(movies, PAGE_SIZE, currentPage).map((movie, index) => (
                <div key={`movie${index}`} id={`movie${index}`} className={classes['movie-container'] + ' ' + classes['fade-in']}>
                  <img
                    className={classes['movie-poster']}
                    src={movie.poster}
                    alt="movie-poster"
                    onClick={onMovieClick.bind(this, movie)}
                  />
                  <div className={classes['movie-title-text']}>{movie.title}</div>
                </div>
              )) }
            </div>
            <div className={classes['slide-pagination-container']}>
              {/* <div className={classes['slide-dot'] + " " + classes['active']}/>
              <div className={classes['slide-dot']} />
              <div className={classes['slide-dot']} />
              <div className={classes['slide-dot']} />
              <div className={classes['slide-dot']} /> */}
              {pageNumberArr.map((pageNumber, index) => (
                <div
                  key={`nowplaying-${index}`}
                  className={classes['slide-dot'] + ((currentPage === pageNumber) ? (' ' + classes['active']) : '') }
                  onClick={onChangePageClick.bind(this, pageNumber)}
                />
              ))}
            </div>
          </div>
        )
        : (
          <div style={{ backgroundColor: "#0b0f18", height: '300px', display: 'flex' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
              <Spinner animation="grow" variant="light" style={{ width: '2.5rem', height: '2.5rem' }}/>
            </div>
          </div>
        )
      }
    </div>
  );
}

export default NowPlayingMovies;
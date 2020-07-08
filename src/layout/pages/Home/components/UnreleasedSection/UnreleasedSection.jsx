import React from 'react';
import { Container } from 'react-bootstrap';
import { Spinner } from 'react-bootstrap';

import classes from './UnreleasedSection.module.scss';
import moment from 'moment';

const UnreleasedSection = (props) => {
  // var history = useHistory();
const { movies } = props;

  // const onMovieClick = (movie) => {
  //   history.push(
  //     `/movie/${movie.id}`,
  //     {
  //       movie: movie
  //     }
  //   );
  // }

  const renderSection = () => {
    return movies.length > 0
      ? (
        <div className={classes['unreleased-movies-container'] + ' ' + classes['fade-in']}>
          {
            props.movies.map((movie) => (
                <div className={classes['unreleased-movie-item']} key={movie.id}>
                  <div className={classes['unreleased-movie-item-date']}>
                    {moment(movie.releasedAt).format('DD/MM/YYYY')}
                  </div>
                  <div className={classes['cai-duong-ke-ngang-voi-hinh-tron']}>
                    <div className={classes['cai-duong-ngang-ben-phai']}></div>
                    <div className={classes['hinh-tron-o-giua']}></div>
                    <div className={classes['cai-duong-ngang-ben-trai']}></div>
                  </div>
                  <img 
                    className={classes['unreleased-movie-item-poster']}
                    src={movie.poster}
                    alt={movie.title}
                  />
                  <div className={classes['unreleased-movie-item-title']}>
                    {movie.title}
                  </div>
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

  return (
    <div className={classes['unreleased-section']}>
      <Container style={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
        <div className={classes['section-title-container']}>
          <div className={classes['section-title-text']}>
            Coming Soon
          </div>
        </div>
        { renderSection() }
      </Container>
    </div>
  );
}

export default UnreleasedSection;
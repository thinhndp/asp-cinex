import React from 'react';
// import { Container } from 'react-bootstrap';
import { helper } from '../../../../../utils/helper';

import classes from './MovieShowcase.module.scss';

const MovieShowcase = (props) => {
  const { nowOnMovies } = props;
  return (
    <div
      className={classes['showcase']}
      style={{ 
        background: `url(${helper.getOneWallpaper(nowOnMovies)})`
      }}
    >
      <div className={classes['opacity-layer']} />
    </div>
  )
}

export default MovieShowcase;
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import FsLightbox from 'fslightbox-react';

import classes from './MovieShowcase.module.scss';

const MovieShowcase = (props) => {
  const [toggler, setToggler] = useState(false);
  const { movie } = props;
  return (
    <div className={classes['showcase']} style={{ background: `url(${movie.wallpapers && movie.wallpapers[0] ? movie.wallpapers[0] : 'https://wallpaperaccess.com/full/1679635.jpg'})`}}>
      <div className={classes['opacity-layer']} />
      <Container className={classes['showcase-inner-container']}>
          <div className={classes['play-button-container']} onClick={ () => setToggler(!toggler)}>
            <i className={classes['play-button'] + ' fas fa-play'}></i>
          </div>
          <FsLightbox
            toggler={ toggler }
            sources={ [
              movie.trailer,
            ] }
          />
      </Container>
    </div>
  )
}

export default MovieShowcase;
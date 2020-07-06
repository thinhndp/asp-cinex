import React, { useState } from "react";
import { Container } from "react-bootstrap";
import FsLightbox from "fslightbox-react";
import { Carousel, Spinner } from 'react-bootstrap';

import classes from "./Showcase.module.scss";

function Showcase(props) {
  const [toggler, setToggler] = useState(false);
  const { movies } = props;

  const filteredOutMoviesWithoutWallpaper = (movies) => {
	return movies.filter(movie => (
		movie.wallpapers && movie.wallpapers.length > 0
		&& movie.wallpapers.every(wallpapers => wallpapers.length > 0)
	));
  }

  const renderWallpaperSlide = (movie) => {
    return (
      <div
        className={classes["showcase"]}
        style={{ background: `url(${movie.wallpapers[0]})` }}
      >
        <div className={classes["opacity-layer"]} />
        <Container className={classes["showcase-inner-container"]}>
          <div
            className={classes["title-container"]}
            onClick={() => setToggler(!toggler)}
          >
            <i className={classes["play-button"] + " fas fa-play"}></i>
            <div className={classes["title-group"]}>
              <div className={classes["title"]}>{movie.title}</div>
              <div className={classes["sub-title"]}>In theater</div>
            </div>
          </div>
          <FsLightbox
            toggler={toggler}
            sources={[movie.trailer && movie.trailer.length > 0 ? movie.trailer : 'https://www.youtube.com/watch?v=bwNV7TAWN3M']}
          />
        </Container>
      </div>
    );
  }

  const renderLoadingSlide = () => {
    return (
      <div
        className={classes["showcase"]}
        style={{ background: `url(https://wallpaperaccess.com/full/1679635.jpg)` }}
      >
        <div className={classes["opacity-layer"]} style={{ opacity: '0.9' }}/>
        <Container className={classes["showcase-inner-container"] + ' ' + classes['child-centering']}>
          <Spinner animation="grow" variant="light" style={{ width: '2.5rem', height: '2.5rem' }}/>
        </Container>
      </div>
    );
  }
  const renderNoMovieWithWallpaper = () => {
	return (
		<div
			className={classes["showcase"]}
			style={{ background: `url(https://wallpaperaccess.com/full/1679635.jpg)` }}
		>
			<div className={classes["opacity-layer"]} style={{ opacity: '0.9' }}/>
		</div>
	);
}

  const renderShowcase = () => {
	const filteredMovies = filteredOutMoviesWithoutWallpaper(movies);
    return movies.length > 0 
    ? (
      <div style={{ backgroundColor: '#0b0f18' }}>
        <div className={classes['fade-in']} style={{ backgroundColor: '#0b0f18' }}>
          <Carousel interval={3000}>
            { filteredMovies.map(movie => (
              <Carousel.Item>
                {renderWallpaperSlide(movie)}
              </Carousel.Item>
            ))}
			{
				filteredMovies.length === 0 &&
				renderNoMovieWithWallpaper()
			}
          </Carousel>
        </div>
      </div>
    ) 
    : renderLoadingSlide();
  }

  return renderShowcase();
}

export default Showcase;

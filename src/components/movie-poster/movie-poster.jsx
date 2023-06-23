import React from 'react';
import { Image } from 'antd';
import icon from './film-poster-placeholder.png';

import './movie-poster.css';

const MoviePoster = ({ poster_path, id }) => {

  const fallback = icon;

  const imagePath = poster_path;
  const isValidPoster = (imagePath) => {
    const path = imagePath ? `https://image.tmdb.org/t/p/w500${imagePath}` : '';
    return path;
  };
  const posterPath = isValidPoster(imagePath);

  return (
    <div key={id} className={'movie-card__poster'}>
      <Image
        width={187}
        height={278}
        src={posterPath}
        fallback={fallback}
      />
    </div>
  );
};

export default MoviePoster;
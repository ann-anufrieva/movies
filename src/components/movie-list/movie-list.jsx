import React from 'react';
import MovieCard from '../movie-card/movie-card';

import './movie-list.css';

const MovieList = ({ movies }) => {
  const isEmpty = !movies.length;

  if (isEmpty) {
    return (
      <div className="movie-list_empty">
        <p className="movie-list__not-found">К сожалению, фильм не найден :с</p>
      </div>
    );
  }

  const list = movies.map((movie) => (
    <div key={movie.id} className="movie-list">
      <MovieCard {...movie} />
    </div>
  ));

  return <div className="list">{list}</div>;
};

export default MovieList;

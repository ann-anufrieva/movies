import React, { useState, useEffect } from "react"; 

import { Rate } from 'antd';
import { format } from 'date-fns';

import MoviePoster from '../movie-poster/movie-poster';
import Genres from "./components/genres";
import PostRating from './components/post-rating';
import RatingRing from "./components/rating-ring";
import OverviewContent from "./components/overview-content";

import './movie-card.css';

const MovieCard = (movie) => {

  const startRating = movie.vote_average || 0;
  const [rating, setRating] = useState(startRating);
  const [rated, setRated] = useState();

  const getRating = (stars) => {
    PostRating(stars, movie);
    setRated(stars);
  };

  const newRating = (stars) => {
    const fixedRating = movie.vote_average;
    if (stars) {
      const auditory = movie.vote_count;
      return (auditory * fixedRating + Number(stars)) / (auditory + 1);
    } else return fixedRating;
  };

  useEffect(() => {
    setRating(newRating (Number(localStorage.getItem(String(movie.id)))));
  }, [rated]);

  const overview = OverviewContent(movie);

  const date = movie.release_date;

  return (
    <div key={movie.id} className="movie-card">
      <MoviePoster {...movie} />
      <div className="movie-card__content">
        <RatingRing rating={rating} />
        <h2 style={{ marginTop: 10, marginBottom: 5, fontSize: 17, textAlign: 'left', paddingRight: 50,  }}>
          {movie.title}
        </h2>
        <p style={{ fontSize: 12, textAlign: 'left', color: '#827E7E', marginTop: 5, marginBottom: 5 }}>
          {date ? format(new Date(date), "MMM dd, yyyy") : "No data"}
        </p>
        <Genres {...movie} />
        <p style={{ fontSize: 12, textAlign: 'left' }}>{overview}</p>
        <div className="movie-card__stars">
          <Rate
            count={10}
            style={{ fontSize: 15, marginTop: 'auto' }}
            value={Number(localStorage.getItem(String(movie.id))) || rated}
            allowHalf
            onChange={getRating}
          />
        </div>
      </div>
    </div>
  );
};
export default MovieCard;


import React, { useState, useEffect } from "react";
import PropTypes, { number } from 'prop-types';

import axios from "axios";

import { Tag } from 'antd';

const Genres = (movie) => {
  const [genres, setGenres] = useState([]);
  
  const getAllGenres = async () => {
    const url = 'https://api.themoviedb.org/3/genre/movie/list?api_key=c5d3833847b4ee2c79d1cb0fa1465e7b';
    const response = await axios.get(url);
    return response.data.genres
      .filter((genre, i) => {
        let movieGenresName;
        const genriesIds = movie.genre_ids;
        console.log(genriesIds)
        genriesIds.includes(genre.id) ? (movieGenresName = genre) : i++;
        return movieGenresName;
      })
      .map((genre) => <Tag key={genre.id}>{genre.name}</Tag>);
  };

  useEffect(() => {
    getAllGenres().then((allGenres) => {
      setGenres(allGenres);
    });
  }, [movie]);

  return <div className="movie-card__tags">{genres}</div>;

};

Genres.propTypes = {
  genre_ids: PropTypes.arrayOf(number),
  id: PropTypes.number,
  name: PropTypes.string,
}

export default Genres;

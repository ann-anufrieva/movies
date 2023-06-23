import React, { useState, useEffect } from "react";
import { Pagination } from 'antd';

import axios from "axios";

import MovieCard from "../movie-card/movie-card";

import './rated.css';

const RatedMovies = () => {
  const [ratedMovies, setRatedMovies] = useState([]);

  useEffect(() => {
    getRated();
  }, []);

  const getRated = async () => {
    const rated = axios(
      `https://api.themoviedb.org/3/guest_session/${localStorage.id}/rated/movies?api_key=c5d3833847b4ee2c79d1cb0fa1465e7b`
    );
    const response = await rated.then((data) => {
      const ratedArr = data.data.results;
      setRatedMovies(ratedArr);
    });
    return response;
  };

  const [currentPage, setCurrentPage] = useState(1);

  const removeCard = (movie) => {
    localStorage.removeItem(movie.id);
    getRated();
    getRated();
  };

  const RatedMoviesForPage = ratedMovies.map((movie, i) => {
    const needToRender = i < currentPage * 20 && i >= (currentPage - 1) * 20;
    return needToRender ? (
      <div key={movie.id} onClick={removeCard}>
        <MovieCard {...movie} key={movie.id} />
      </div>
    ) : null;
  });
  const paginationHandler = (newPage) => {
    console.log(newPage);
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const getTotalPages = (movies) => {
    return Math.ceil(movies.length / 20);
  };
  const totalPages = getTotalPages(ratedMovies);

  return (
    <div className={'rated-movies'}>
      <div className="list">{RatedMoviesForPage}</div>
      <Pagination
        style={{ paddingBottom: 25 }}
        showSizeChanger={false}
        onChange={paginationHandler}
        pageSize={1}
        current={currentPage}
        total={totalPages}
        defaultPageSize={20}
      />
    </div>
  );
};

export default RatedMovies;
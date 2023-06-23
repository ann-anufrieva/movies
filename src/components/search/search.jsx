import React from 'react';
import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';

import { Input, Pagination, Spin } from 'antd';

import MovieList from '../movie-list/movie-list';

import './search.css';


const SearchList = () => {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('return');
  const [loading, setStateLoading] = useState('false');
  const baseUrl = 'https://api.themoviedb.org/3/search/movie?api_key=c5d3833847b4ee2c79d1cb0fa1465e7b&query=';

  const onSearchInput = (e) => {
    const targetInput = e.target;
    setStateLoading('true');
    const query = targetInput.value;
    setSearchValue(query);
    return query;
  };

  const debouncedSearch = useDebounce(searchValue, 500);
  const searchItem = debouncedSearch[0];

  useEffect(() => {
    setStateLoading('true');
    setMovies([]);
    getMovieRequest(searchItem);
  }, [page]);

  useEffect(() => {
    if (searchValue) {
      setMovies([]);
      setStateLoading('true');
      getMovieRequest(searchItem);
    } else {
      setMovies([]);
      getMovieRequest('return');
    }
  }, [searchItem]);

  const input = <Input className="search" placeholder="Type to search...or die" type="text" onChange={onSearchInput} />;

  const getMovieRequest = async (search) => {
    console.log(search);
    const url = `${baseUrl}${search}&page=${page}`;
    const response = await fetch(url);
    const responseJson = response.json().then((data) => data.results);
    const result = await responseJson;
    setStateLoading('false');
    setMovies(result);
  };

  const paginationHandler = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [page]);

  const LoaderMovie = () => {
    if (loading === 'false') {
      return <MovieList movies={movies} />;
    } else {
      return (
        <div className="movie-list_loading">
          <Spin style={{ padding: 50 }} size={'large'} tip="Loading" />
        </div>
      );
    };
  };

  return (
    <div className="App">
      <div>{input}</div>
      <LoaderMovie />
      <Pagination
        style={{ paddingBottom: 25 }}
        showSizeChanger={false}
        current={page}
        pageSize={1}
        total={5}
        onChange={paginationHandler}
      />
    </div>
  );
}

export default SearchList;
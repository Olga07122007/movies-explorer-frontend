import './Movies.css';
import { useState, useEffect } from 'react';
import movi from '../../utils/MoviesApi';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function Movies({ onMovieLike, savedArray, openErrorWindow }) {
  const [initialMovies, setInitialMovies] = useState([]);
  const [filmsArray, setFilmsArray] = useState([]);
  const [notFound, setNotFound] = useState(true);
  const [shortMovies, setShortMovies] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  
  // загрузка последнего результата поиска данного пользователя
  useEffect(() => {
    if (localStorage.getItem('movies')) {
      const movies = JSON.parse(localStorage.getItem('movies'));
      movies.length === 0 ? setNotFound(true) : setNotFound(false);
      setInitialMovies(movies);
      if (localStorage.getItem('shortMovies') === 'true') {
        setFilmsArray(movies);
        setShortMovies(false);
      }
      else {
        setFilmsArray(filterMoviesByDuration(movies));
        setShortMovies(true);
        filterMoviesByDuration(movies).length === 0 ? setNotFound(true) : setNotFound(false);
      }
      if (localStorage.getItem('inputValue')) {
        setInputValue(localStorage.getItem('inputValue'));
      }
    }
    else {
      setNotFound(true);
    }
  }, []);
  
  // установка чекбокса
  useEffect(() => {
    if (localStorage.getItem('shortMovies')) {
      if (localStorage.getItem('shortMovies') === 'true') {
       setShortMovies(false);
      }
      else {
        setShortMovies(true);
      }
    }
  }, []);
  
  // установка значения инпута в форме поиска
  useEffect(() => {
    if (localStorage.getItem('inputValue')) {
      setInputValue(localStorage.getItem('inputValue'));
    }
  }, []);
  
  // сортировка фильмов по длительности
  function filterMoviesByDuration(movies) {
    return movies.filter((movie) => movie.duration <= 40);
  }; 
  
  // сортировка фильмов по ключевому слову
  function filterMoviesByKeyworlds(movies, keywords) {
    const moviesByKeyworlds = movies.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(keywords.toLowerCase())
    });
    return moviesByKeyworlds;
  };
  
  // сортировка фильмов, сохранение в localStorage
  function handleSetInitialMovies(movies, keywords) {
    const moviesCardList = filterMoviesByKeyworlds(movies, keywords);
    moviesCardList.length === 0 ? setNotFound(true) : setNotFound(false);
    setInitialMovies(moviesCardList);
    localStorage.setItem('shortMovies', !shortMovies);
    localStorage.setItem('movies', JSON.stringify(moviesCardList));
    localStorage.setItem('inputValue', keywords);
    
    if (shortMovies) {
      setFilmsArray(filterMoviesByDuration(moviesCardList));
      filterMoviesByDuration(moviesCardList).length === 0 ? setNotFound(true) : setNotFound(false);
    }
    else {
      setFilmsArray(moviesCardList);
    }
  }
  
  // поиск фильмов в базе
  function getMovies(keywords) {
    setIsLoading(true);
    movi.getInitialCards()
      .then((movies) => {
        handleSetInitialMovies(movies, keywords);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      })
      .finally(() => {
        setIsLoading(false)
      });
  }
  
  // переключение чекбокса "короткометражки"
  function checkedShotMovies() {
    setShortMovies(!shortMovies);
    if (!shortMovies) {
      if (filterMoviesByDuration(initialMovies).length === 0) {
        setFilmsArray(filterMoviesByDuration(initialMovies));
        setNotFound(true);
      } 
      else {
        setFilmsArray(filterMoviesByDuration(initialMovies));
        setNotFound(false);
      }
    } 
    else {
      initialMovies.length === 0 ? setNotFound(true) : setNotFound(false);
      setFilmsArray(initialMovies);
    }
    localStorage.setItem('shortMovies', shortMovies);
  }

  return (
    <main className="main">
      <SearchForm 
        getMovies={getMovies}
        checkedShotMovies={checkedShotMovies}
        shortMovies={shortMovies}
        inputValue={inputValue}
        openErrorWindow={openErrorWindow}
      />
      {
        isLoading ? <Preloader /> :
        
        error ? 
        <p className="movies__error">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</p> :
                    
        <MoviesCardList
          filmsArray={filmsArray}
          notFound={notFound}
          onMovieLike={onMovieLike}
          savedArray={savedArray}
          savedPage={false}
        />
      }
    </main>  
  );
}

export default Movies;
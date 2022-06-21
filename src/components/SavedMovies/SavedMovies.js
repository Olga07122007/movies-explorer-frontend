import './SavedMovies.css';
import { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({ savedArray, onMovieDelete, openErrorWindow }) {
  const [initialMovies, setInitialMovies] = useState([]);
  const [filmsArray, setFilmsArray] = useState([]);
  const [notFound, setNotFound] = useState(true);
  const [shortMovies, setShortMovies] = useState(false);
  const [inputValue, setInputValue] = useState('');
  
  // загрузка последнего результата поиска данного пользователя
  useEffect(() => {
    if (localStorage.getItem('moviesSaved')) {
      const movies = JSON.parse(localStorage.getItem('moviesSaved'));
      movies.length === 0 ? setNotFound(true) : setNotFound(false);
      setInitialMovies(movies);
      if (localStorage.getItem('shortMoviesSaved') === 'true') {
        setFilmsArray(movies);
        setShortMovies(false);
      }
      else {
        setFilmsArray(filterMoviesByDuration(movies));
        setShortMovies(true);
        filterMoviesByDuration(movies).length === 0 ? setNotFound(true) : setNotFound(false);
      }
      if (localStorage.getItem('inputValueSaved')) {
        setInputValue(localStorage.getItem('inputValueSaved'));
      }
    }
    else {
      setNotFound(true);
    }
  }, []);
  
  // установка чекбокса
  useEffect(() => {
    if (localStorage.getItem('shortMoviesSaved')) {
      if (localStorage.getItem('shortMoviesSaved') === 'true') {
       setShortMovies(false);
      }
      else {
        setShortMovies(true);
      }
    }
  }, []);
  
  // установка значения инпута в форме поиска
  useEffect(() => {
    if (localStorage.getItem('inputValueSaved')) {
      setInputValue(localStorage.getItem('inputValueSaved'));
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
    localStorage.setItem('shortMoviesSaved', !shortMovies);
    localStorage.setItem('moviesSaved', JSON.stringify(moviesCardList));
    localStorage.setItem('inputValueSaved', keywords);
    
    if (shortMovies) {
      setFilmsArray(filterMoviesByDuration(moviesCardList));
      filterMoviesByDuration(moviesCardList).length === 0 ? setNotFound(true) : setNotFound(false);
    }
    else {
      setFilmsArray(moviesCardList);
    }
  }
  
  // поиск фильмов в базе сохраненных фильмов
  function getSavedMovies(keywords) {
    if (savedArray) {
      handleSetInitialMovies(savedArray, keywords);
    }
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
    localStorage.setItem('shortMoviesSaved', shortMovies);
  }
  
  // обновление страницы с сохраненными фильмами при добавлении (удалении) нового фильма
  useEffect(() => {
    if (localStorage.getItem('moviesSaved')) {
      const moviesCardList = filterMoviesByKeyworlds(savedArray, localStorage.getItem('inputValueSaved'));
      localStorage.setItem('moviesSaved', JSON.stringify(moviesCardList));
      setInitialMovies(moviesCardList);
      if (localStorage.getItem('shortMoviesSaved') === 'true') {
        setFilmsArray(moviesCardList);
        moviesCardList.length === 0 ? setNotFound(true) : setNotFound(false);
      }
      else {
        setFilmsArray(filterMoviesByDuration(moviesCardList));
        filterMoviesByDuration(moviesCardList).length === 0 ? setNotFound(true) : setNotFound(false);
      }
    }
  }, [savedArray])

  return (
    <main className="main">
      <SearchForm 
        checkedShotMovies={checkedShotMovies}
        shortMovies={shortMovies}
        inputValue={inputValue}
        getSavedMovies={getSavedMovies}
        openErrorWindow={openErrorWindow}
      />
                  
      <MoviesCardList
        filmsArray={filmsArray}
        notFound={notFound}
        savedArray={savedArray}
        savedPage={true}
        onMovieDelete={onMovieDelete}
      />
      
    </main>  
  );
}

export default SavedMovies;
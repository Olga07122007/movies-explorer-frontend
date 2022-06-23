import './SavedMovies.css';
import { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { shortFilmDuration } from "../../utils/constants";

function SavedMovies({ savedArray, onMovieDelete, openErrorWindow }) {
  const [initialMovies, setInitialMovies] = useState([]);
  const [filmsArray, setFilmsArray] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [shortMovies, setShortMovies] = useState(false);
  const [inputValue, setInputValue] = useState('');
  
  // загрузка сохраненных фильмов
  useEffect(() => {
    if (savedArray) {
      const movies = savedArray;
      setInitialMovies(movies);
      if (localStorage.getItem('shortMoviesSaved')) {
        if (localStorage.getItem('shortMoviesSaved') === 'true') {
          setFilmsArray(movies);
          setShortMovies(false);
        }
        else {
          setFilmsArray(filterMoviesByDuration(movies));
          setShortMovies(true);
        }
      }
      else {
        setFilmsArray(movies);
        setShortMovies(false);
      }
      
      if (localStorage.getItem('inputValueSaved')) {
        setInputValue(localStorage.getItem('inputValueSaved'));
      }
    }
  }, [savedArray]);
 
  // сортировка фильмов по длительности
  function filterMoviesByDuration(movies) {
    return movies.filter((movie) => movie.duration <= shortFilmDuration);
  }; 
  
  // сортировка фильмов по ключевому слову
  function filterMoviesByKeyworlds(movies, keywords) {
    const moviesByKeyworlds = movies.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(keywords.toLowerCase())
    });
    return moviesByKeyworlds;
  };
  
  // сортировка фильмов
  function handleSetInitialMovies(movies, keywords) {
    const moviesCardList = filterMoviesByKeyworlds(movies, keywords);
    moviesCardList.length === 0 ? setNotFound(true) : setNotFound(false);
    setInitialMovies(moviesCardList);
    localStorage.setItem('shortMoviesSaved', !shortMovies);
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

  return (
    <main className="main">
      <SearchForm 
        checkedShotMovies={checkedShotMovies}
        shortMovies={shortMovies}
        getSavedMovies={getSavedMovies}
        openErrorWindow={openErrorWindow}
        inputValue={inputValue}
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
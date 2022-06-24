import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useState, useEffect, useCallback } from 'react';
import { mobileScreen, quantityCard, quantityCardMobile, startMoreCard, endMoreCard, endMoreCardMobile } from "../../utils/constants";

function MoviesCardList({ moviesMore, filmsArray, notFound, onMovieLike, savedArray, savedPage, onMovieDelete }) {
  const { pathname } = useLocation();
  const getScreenWidth = useCallback(() => window.screen.width, []);
  const [screen, setScreen] = useState(getScreenWidth());
  const [resultArray, setResultArray] = useState(filmsArray);
  
  // отображение массива с карточками
  useEffect(() => {
    if (!savedPage) {
      if (filmsArray) {
        if (screen > mobileScreen){
          const result = filmsArray.slice(0, quantityCard);
          setResultArray(result);
        }
        else {
          const result = filmsArray.slice(0, quantityCardMobile);
          setResultArray(result);
        }
      }
    }
    else {
      setResultArray(filmsArray);
    }
  }, [filmsArray, screen, savedPage]);
 
  // получаем разрешение экрана пользователя
  useEffect(() => {
    window.addEventListener('resize', resizeFunction);
    function handleResize() {
      setScreen(getScreenWidth());
    };
    
    let timer;
    function resizeFunction() {
      if (!timer) {
        timer = setTimeout(() => {
          timer = false;
          handleResize();
        }, 500);
      }
    }
    return () => window.removeEventListener('resize', resizeFunction);
  }, [getScreenWidth]);
  
  // кнопка "Еще"
  function clickMore() {
    const last = resultArray.length-1;
    if (screen > mobileScreen) {
      if (filmsArray.length > resultArray.length) {
        const newCards = filmsArray.slice(last + startMoreCard, last + endMoreCard);
        setResultArray([...resultArray, ...newCards]);
      }        
    }
    else {
      const newCards = filmsArray.slice(last + startMoreCard, last + endMoreCardMobile);
      setResultArray([...resultArray, ...newCards]);
    }
  }
  
  return (
    <section className={`movies ${pathname === '/saved-movies' ? 'movies__saved': ''}`}>
     
     {
        notFound ? <p className="movies__error">Ничего не найдено</p> :
        
        resultArray.map((movie) => (
					<MoviesCard
						key={movie.id || movie.movieId}
						movie={movie}
            onMovieLike={onMovieLike}
            savedArray={savedArray}
            onMovieDelete={onMovieDelete}
					/>
				))
      }
     
      {(pathname === '/movies' && resultArray.length < filmsArray.length) &&
        <button type="button" className="movies__more" onClick={clickMore}>Еще</button> 
      }
    </section>
  );
}

export default MoviesCardList;
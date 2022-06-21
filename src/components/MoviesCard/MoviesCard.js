import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import { useState, useEffect } from 'react';

function MoviesCard({ movie, onMovieLike, savedArray, onMovieDelete }) {
  const { pathname } = useLocation();
  const [isSaved, setIsSaved] = useState(false);
  
  useEffect(() => {
    if (savedArray.length) {
      setIsSaved(savedArray.some(i => i.movieId === movie.id));
    }
  }, [savedArray])
  
	const cardLikeButtonClassName = (
		`movie__button ${isSaved ? 'movie__button_active' : ''}`
	);

  // поставить (удалить) лайк и сохранить(удалить) фильм
	function handleLikeClick() {
		onMovieLike(movie);
    setIsSaved(!isSaved);
  }

  // удалить фильм из сохраненных
  function handleDeleteClick() {
    onMovieDelete(movie);
    setIsSaved(!isSaved);
  }    
  
  // длительность
  const durationMovie = (duration) => {
    return `${Math.floor(duration / 60)}ч ${duration % 60}м`;
  }
  
  return (
    <div className="movie">
      <div className="movie__about">
        <div className="movie__description">
          <h2 className="movie__title">{movie.nameRU}</h2>
          <p className="movie__duration">{durationMovie(movie.duration)}</p>
        </div>
        
        {pathname === '/saved-movies' ? (
          <button type="button" className="movie__button movie__button_delete" onClick={handleDeleteClick}></button> 
        ) : (
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button> 
        )}
      </div>
      <a href={movie.trailerLink} target="blank"><img className="movie__photo" src={pathname === '/saved-movies' ? `${movie.image}` : `https://api.nomoreparties.co${movie.image.url}`} alt={movie.nameRU} /></a>
    </div>
  );
}

export default MoviesCard;
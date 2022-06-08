import { Link, useLocation } from 'react-router-dom';
import './MoviesCard.css';
import moviePhoto from '../../images/movie-photo.jpg';

function MoviesCard() {
  const { pathname } = useLocation();
  
  return (
    <div className="movie">
      <div className="movie__about">
        <div className="movie__description">
          <h2 className="movie__title">33 слова в дизайне</h2>
          <p className="movie__duration">1ч 42м</p>
        </div>
        
        {pathname === '/saved-movies' ? (
          <button type="button" className="movie__button movie__button_delete"></button> 
        ) : (
          <button type="button" className="movie__button"></button> 
        )}
      </div>
      <img className="movie__photo" src={moviePhoto} alt="33 слова о дизайне" />
    </div>
    
  );
}

export default MoviesCard;
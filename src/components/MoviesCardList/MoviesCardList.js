import { Link, useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ moviesMore }) {
  const { pathname } = useLocation();
  
  return (
    <section className={`movies ${pathname === '/saved-movies' ? 'movies__saved': ''}`}>
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      
      {pathname === '/movies' &&
        <button type="button" className="movies__more">Еще</button> 
      }
    </section>
  );
}

export default MoviesCardList;
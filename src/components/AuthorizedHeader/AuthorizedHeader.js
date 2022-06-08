import { Link } from 'react-router-dom';
import { useState } from 'react';
import './AuthorizedHeader.css';

import Navigation from '../Navigation/Navigation';

function AuthorizedHeader() {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  
  function handleNavigationOpen() {
    setIsNavigationOpen(true);
  }
  
  function handleNavigationClose() {
    setIsNavigationOpen(false);
  }
  
  return (
    <nav className="header__authorized">
      <div className="header__links">
        <Link to="/movies" className="header__link">Фильмы</Link>
        <Link to="/saved-movies" className="header__link">Сохраненные фильмы</Link>
      </div>
      <Link to="/profile" className="header__account">  
        <p className="header__profile">Аккаунт</p>
        <div className="header__icon"></div>
      </Link>
      <button type="button" className="header__burger" onClick={handleNavigationOpen}></button>
      <Navigation 
        isOpen={isNavigationOpen}
        isClose={handleNavigationClose}
      />
    </nav>   
  );
}

export default AuthorizedHeader;
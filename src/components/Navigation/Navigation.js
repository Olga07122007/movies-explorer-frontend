import { Link, NavLink } from 'react-router-dom';
import './Navigation.css';


function Navigation({ isOpen, isClose }) {
  
  return (
    <section className={`navigation ${isOpen ? 'navigation_opened': ''}`}>
			<div className="navigation__container">
				
					<Link className="navigation__link" to="/">Главная</Link>
          <NavLink className="navigation__link" to="/movies" activeClassName="navigation__link_active">Фильмы</NavLink>
          <NavLink className="navigation__link" to="/saved-movies" activeClassName="navigation__link_active">Сохраненные фильмы</NavLink>
          
          <NavLink to="/profile" className="navigation__account">  
            <p className="navigation__profile">Аккаунт</p>
            <div className="navigation__icon"></div>
          </NavLink>
          
					<button type="button" className="navigation__close-icon" onClick={isClose}></button>
          
			</div>
		</section>
  );
}

export default Navigation;
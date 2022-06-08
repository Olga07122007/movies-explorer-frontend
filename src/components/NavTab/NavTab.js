import { Link } from 'react-router-dom';
import './NavTab.css';

function NavTab() {
  return (
    <section className="nav">  
      <ul className="nav__buttons">
        <li className="nav__button">
          <a className="nav__link" href="#about-project" >О проекте</a>
        </li>
        <li className="nav__button">
          <a className="nav__link" href="#techs" >Технологии</a>
        </li>
        <li className="nav__button">
          <a className="nav__link" href="#about-me">Студент</a>
        </li>
      </ul>
    </section>
  );
}

export default NavTab;
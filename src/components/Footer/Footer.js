import { Link } from 'react-router-dom';

import './Footer.css';


function Footer() {
  return (
  
  <footer className="footer">
      <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__container">
        <p className="footer__copy">&copy; 2022</p>
        <div className="footer__links">
          <a className="footer__link" href="https://practicum.yandex.ru" target="blank">Яндекс.Практикум</a>
          <a className="footer__link" href="https://github.com/Olga07122007" target="blank">Github</a>
          <a className="footer__link" href="https://github.com/Olga07122007" target="blank">Facebook</a>
        </div>
      </div>
    </footer>
    
  );
}

export default Footer;
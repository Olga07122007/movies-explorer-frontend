import { Link } from 'react-router-dom';
import './UnauthorizedHeader.css';


function UnauthorizedHeader() {
  return (
    <nav className="header__unauthorized">
      <Link to="/signup" className="header__register">Регистрация</Link>
      <div className="header__button"><Link to="/signin"className="header__signin">Войти</Link></div>
    </nav>
  );
}

export default UnauthorizedHeader;
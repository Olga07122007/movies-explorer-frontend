import { Link } from 'react-router-dom';
import './Register.css';
import logo from '../../images/logo.svg';

function Register() {
  return (
    <main className="main">
      <section className="register">
        <div className="register__container">
          <Link to="/" className="register__route"><img className="register__logo" src={logo} alt="Логотип" /></Link>
          <h1 className="register__title">Добро пожаловать!</h1>
          <form name="formregister" className="register__form" noValidate>
          
            <p className="register__text">Имя</p>
            <input type="text" className="register__input" name="name" id="name" required defaultValue="Виталий" minLength="2" maxLength="30" />  
						<p className="register__error"></p>
            
            <p className="register__text">E-mail</p>
            <input type="email" className="register__input" name="email" id="email" required defaultValue="pochta@yandex.ru" />
						<p className="register__error"></p>
            
            <p className="register__text">Пароль</p>
            <input type="password" className="register__input" name="password" id="password" required defaultValue=".............." />
						<p className="register__error">Что-то пошло не так...</p>
            
            <button type="submit" className="register__save-btn" >Зарегистрироваться</button>
					</form>
					<Link to="/signin" className="register__link">Уже зарегистрированы? <span className="register__blue">Войти</span></Link>
        </div>
      </section>
    </main>
  );
}

export default Register;
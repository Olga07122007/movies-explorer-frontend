import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import isEmail from 'validator/es/lib/isEmail';
import logo from '../../images/logo.svg';

function Login({ handleLogin }) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  
  //данные инпутов
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === 'email') {
      if (isEmail(value)) {
        e.target.setCustomValidity('');
      } else {
          e.target.setCustomValidity('Некорректный формат E-mail');
      }
    }
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: e.target.validationMessage });
    setIsValid(e.target.closest('form').checkValidity());
  };
  
  //авторизация
	function handleSubmit(e) {
		e.preventDefault();
		handleLogin(values);
  }  
  
  return (
    <main className="main">
      <section className="login">
        <div className="login__container">
          <Link to="/" className="login__route"><img className="login__logo" src={logo} alt="Логотип" /></Link>
          <h1 className="login__title">Рады видеть!</h1>
          <form name="formlogin" className="login__form" noValidate onSubmit={handleSubmit}>
          
            <p className="login__text">E-mail</p>
            <input 
              type="email" 
              value={values.email || ''} 
              onChange={handleChange} 
              className="login__input" 
              name="email" 
              id="email" 
              required 
            />
            <p className={`login__error ${errors.email ? 'login__error_visible' : ''}`}>{errors.email}</p>
						
            <p className="login__text">Пароль</p>
            <input 
              type="password" 
              value={values.password || ''} 
              onChange={handleChange} 
              className="login__input" 
              name="password" 
              id="password" 
              required
              minLength="6"
              maxLength="30"  
            />
            <p className={`login__error ${errors.password ? 'login__error_visible' : ''}`}>{errors.password}</p>
						
            <button type="submit" className={`login__save-btn ${isValid ? "" : "login__save-btn_disabled"}`} disabled={!isValid ? true : ''}>Войти</button>
          </form>
					<Link to="/signup" className="login__link">Еще не зарегистрированы?<span className="login__blue"> Регистрация</span></Link>
        </div>
      </section>
    </main>
  );
}

export default Login;
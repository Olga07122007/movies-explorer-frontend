import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import logo from '../../images/logo.svg';
import isEmail from 'validator/es/lib/isEmail';

function Register({ handleRegister }) {
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
	
	//регистрация
	function handleSubmit(e) {
		e.preventDefault();
    handleRegister(values);
	} 
  
  return (
    <main className="main">
      <section className="register">
        <div className="register__container">
          <Link to="/" className="register__route"><img className="register__logo" src={logo} alt="Логотип" /></Link>
          <h1 className="register__title">Добро пожаловать!</h1>
          <form name="formregister" className="register__form" noValidate onSubmit={handleSubmit}>
          
            <p className="register__text">Имя</p>
            <input 
              type="text" 
              value={values.name || ''} 
              onChange={handleChange} 
              className="register__input" 
              name="name" 
              id="name" 
              required minLength="2" 
              maxLength="30"
              pattern='^[A-Za-zА-Яа-я /s -]+$'
            />
            <p className={`register__error ${errors.name ? 'register__error_visible' : ''}`}>{errors.name}</p>    
						
            <p className="register__text">E-mail</p>
            <input 
              type="email" 
              value={values.email || ''} 
              onChange={handleChange} 
              className="register__input" 
              name="email" 
              id="email" 
              required
            />
						<p className={`register__error ${errors.email ? 'register__error_visible' : ''}`}>{errors.email}</p> 
            
            <p className="register__text">Пароль</p>
            <input 
              type="password" 
              value={values.password || ''} 
              onChange={handleChange} 
              className="register__input" 
              name="password" 
              id="password" 
              required
              minLength="6"
              maxLength="30"  
            />
						<p className={`register__error ${errors.password ? 'register__error_visible' : ''}`}>{errors.password}</p> 
            
            <button type="submit" className={`register__save-btn ${isValid ? "" : "register__save-btn_disabled"}`} disabled={!isValid ? true : ''}>Зарегистрироваться</button>
            
					</form>
					<Link to="/signin" className="register__link">Уже зарегистрированы? <span className="register__blue">Войти</span></Link>
        </div>
      </section>
    </main>
  );
}

export default Register;
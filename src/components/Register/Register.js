import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import logo from '../../images/logo.svg';

function Register({ handleRegister }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	
	//управляемые инпуты
  function handleChangeName(e) {
    setName(e.target.value);
	}
  
	function handleChangeEmail(e) {
    setEmail(e.target.value);
	}
	
	function handleChangePassword(e) {
    setPassword(e.target.value);
  }
	
	//регистрация
	function handleSubmit(e) {
		e.preventDefault();
    handleRegister(name, email, password);
	} 
  
  return (
    <main className="main">
      <section className="register">
        <div className="register__container">
          <Link to="/" className="register__route"><img className="register__logo" src={logo} alt="Логотип" /></Link>
          <h1 className="register__title">Добро пожаловать!</h1>
          <form name="formregister" className="register__form" noValidate onSubmit={handleSubmit}>
          
            <p className="register__text">Имя</p>
            <input type="text" value={name} onChange={handleChangeName} className="register__input" name="name" id="name" required minLength="2" maxLength="30" />  
						<p className="register__error"></p>
            
            <p className="register__text">E-mail</p>
            <input type="email" value={email} onChange={handleChangeEmail} className="register__input" name="email" id="email" required />
						<p className="register__error"></p>
            
            <p className="register__text">Пароль</p>
            <input type="password" value={password} onChange={handleChangePassword} className="register__input" name="password" id="password" required />
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
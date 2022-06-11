import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

import logo from '../../images/logo.svg';

function Login({ handleLogin }) {
  const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
  
  //управляемые инпуты
	function handleChangeEmail(e) {
    setEmail(e.target.value);
	}
	
	function handleChangePassword(e) {
    setPassword(e.target.value);
  }
	
	//авторизация
	function handleSubmit(e) {
		e.preventDefault();
		console.log(email);
    handleLogin(email, password);
	} 
  
  
  return (
    <main className="main">
      <section className="login">
        <div className="login__container">
          <Link to="/" className="login__route"><img className="login__logo" src={logo} alt="Логотип" /></Link>
          <h1 className="login__title">Рады видеть!</h1>
          <form name="formlogin" className="login__form" noValidate onSubmit={handleSubmit}>
          
            <p className="login__text">E-mail</p>
            <input type="email" value={email} onChange={handleChangeEmail} className="login__input" name="email" id="email" required />
						<p className="login__error"></p>
            
            <p className="login__text">Пароль</p>
            <input type="password" value={password} onChange={handleChangePassword} className="login__input" name="password" id="password" required />
						<p className="login__error"></p>
            
            <button type="submit" className="login__save-btn" >Войти</button>
					</form>
					<Link to="/signup" className="login__link">Еще не зарегистрированы?<span className="login__blue"> Регистрация</span></Link>
        </div>
      </section>
    </main>
  );
}

export default Login;
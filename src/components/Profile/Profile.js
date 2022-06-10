import { Link } from 'react-router-dom';
import './Profile.css';

function Profile() {
  return (
    <main className="main">
      <section className="profile">
        <div className="profile__container">
          <h1 className="profile__title">Привет, Виталий!</h1>
          <form name="formprofile" className="profile__form" noValidate>
            <p className="profile__text">Имя</p>
            <input type="text" className="profile__input" name="name" id="name" required minLength="2" maxLength="30" defaultValue="Виталий" />  
						<p className="profile__error"></p>
          
            <p className="profile__text">E-mail</p>
            <input type="email" className="profile__input" name="email" id="email" required defaultValue="pochta@yandex.ru" />
						<p className="profile__error"></p>
            
            <button type="submit" className="profile__save-btn" >Редактировать</button>
					</form>
					<Link to="/" className="profile__link">Выйти из аккаунта</Link>
        </div>
      </section>
    </main>
  );
}

export default Profile;
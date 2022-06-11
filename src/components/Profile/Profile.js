import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile({ handleEditProfile, signOut }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('Виталий');
  const [email, setEmail] = useState('');
	
  // запись значений в инпуты
	useEffect(() => {
		setName(currentUser.name);
		setEmail(currentUser.email);
	}, [currentUser]);
  
	// управляемые инпуты
  function handleChangeName(e) {
    setName(e.target.value);
	}
  
	function handleChangeEmail(e) {
    setEmail(e.target.value);
	}
	
	// изменение профиля
	function handleSubmit(e) {
		e.preventDefault();
    handleEditProfile({
			name,
			email,
		});
	} 
  
  return (
    <main className="main">
      <section className="profile">
        <div className="profile__container">
          <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>
          <form name="formprofile" className="profile__form" noValidate onSubmit={handleSubmit}>
            <p className="profile__text">Имя</p>
            <input type="text" value={name || ''} onChange={handleChangeName} className="profile__input" name="name" id="name" required minLength="2" maxLength="30" />  
						<p className="profile__error"></p>
          
            <p className="profile__text">E-mail</p>
            <input type="email" value={email || ''} onChange={handleChangeEmail} className="profile__input" name="email" id="email" required  />
						<p className="profile__error"></p>
            
            <button type="submit" className="profile__save-btn" >Редактировать</button>
					</form>
					<button className="profile__link" onClick={signOut}>Выйти из аккаунта</button>
        </div>
      </section>
    </main>
  );
}

export default Profile;
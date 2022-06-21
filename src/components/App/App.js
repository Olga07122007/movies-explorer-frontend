import { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import Footer from '../Footer/Footer';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import api from '../../utils/MainApi';
import failIcon from '../../images/popup-fail-icon.svg';
import InfoTooltip from '../InfoTooltip/InfoTooltip';

function App() {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const { pathname } = useLocation();
  const [savedArray, setSavedArray] = useState([]);
  const [message, setMessage] = useState('');
  const [errorPopupOpen, setErrorPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // отображение начального профиля, загрузка сохраненных карточек
  useEffect(() => {
    checkToken();
    if (loggedIn) {
      api._headers.authorization = `Bearer ${localStorage.getItem('token')}`;
      api.getBasicInformation()
			.then((userData) => {
        setCurrentUser(userData);
      })
			.catch(err => {
				console.log(`Ошибка: ${err}`);
			});
     
      api.getInitialCards()
        .then((movies) => {
          setSavedArray(movies);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [loggedIn]);
  
  // регистрация
  function handleRegister(data) {
    api.register(data)
			.then((res) => {
        if (res) {
          handleLogin(data);
        }
			})	
			.catch((err) => {
				console.log(err);
        if (err === 409) {
          setMessage('Пользователь с таким email уже существует');
        }
        else {
          setMessage('При регистрации пользователя произошла ошибка');
        }
        openErrorPopup();
			});
  }
  
  // авторизация
	function handleLogin(data) {
		api.login(data)
			.then((res) => {
				if(res.token) {
          localStorage.setItem('token', res.token);
          setLoggedIn(true);
          history.push('/movies');
				}
			})
      .catch((err) => {
				console.log(err);
        if (err === 401) {
          setMessage('Вы ввели неправильный логин или пароль');
        }
        else {
          setMessage('При авторизации пользователя произошла ошибка');
        }
        openErrorPopup();
			});
	}
  
  // проверка токена
	function checkToken() {
		if (localStorage.getItem('token')) {
			const jwt = localStorage.getItem('token');
      api.check(jwt)
				.then((res) => {
					setLoggedIn(true);
        })
        .catch((err) => {
					console.log(`Ошибка: ${err}`);
				})
        .finally(() => { setIsLoading(false) })
		}
	}
  
  // изменение профиля
  function handleEditProfile(data) {
    api.editProfile(data)
      .then(result => {
        setCurrentUser(result);
      })
      .catch((err) => {
        console.log(err);
        if (err === 409) {
          setMessage('Пользователь с таким email уже существует');
        }
        else {
          setMessage('При обновлении профиля произошла ошибка');
        }
        openErrorPopup();
      });
  }
  
  // выход
	function signOut() {
		localStorage.clear();
		setLoggedIn(false);
    history.push('/');
	}
  
  // лайк (отмена лайка) и сохранение (удаление) фильма
  function onMovieLike(movie) {
    if (savedArray) {
      const isSaved = savedArray.some(i => i.movieId === movie.id);
      if (!isSaved) {
        api.addCard(movie)
          .then((newMovie) => {
            setSavedArray([newMovie, ...savedArray]);
          })
          .catch(err => {
            console.log(`Ошибка1: ${err}`);
          })
      }
      else {
        const deleteMovie = savedArray.filter((film) => {
          return film.movieId === movie.id
        });
        const deleteMovieId = deleteMovie[0]._id
        api.deleteCard(deleteMovieId)
          .then((newMovie) => {
            setSavedArray((state) => state.filter((c) => c.movieId !== movie.id));
          })
          .catch(err => {
            console.log(`Ошибка1: ${err}`);
          })
      }       
    }
  }
  
  // удаление фильма из сохраненных
  function onMovieDelete(movie) {
    if (savedArray) {
      const deleteMovie = savedArray.filter((film) => {
        return film._id === movie._id
      });
      
      if (deleteMovie.length) {
        const deleteMovieId = deleteMovie[0]._id
        api.deleteCard(deleteMovieId)
          .then((newMovie) => {
            setSavedArray((state) => state.filter((c) => c._id !== movie._id));
          })
          .catch(err => {
            console.log(`Ошибка1: ${err}`);
          })
      }  
    }
  }
  
  // открытие попапа с ошибкой
  function openErrorPopup() {
    setErrorPopupOpen(true);
  }

  // закрытие попапа с ошибкой
  function closeErrorPopup() {
    setErrorPopupOpen(false);
  }
  
  // открытие попапа с ошибкой, если не заполнено поле поиска фильма
  function openErrorPopupSearch(message) {
    setMessage(message);
    setErrorPopupOpen(true);
  }
 
  return (
		<div className="page">
    <CurrentUserContext.Provider value={currentUser}>
    
    {
      pathname === '/' || 
      pathname === '/movies' || 
      pathname === '/saved-movies' ||
      pathname === '/profile' ? 
      <Header loggedIn={loggedIn} /> : ''
    }
    
      <Switch>
        <Route exact path="/">
					<Main />
        </Route>
      
        <ProtectedRoute
          loggedIn={loggedIn}
          path="/movies"
          component={Movies}
          onMovieLike={onMovieLike}
          savedArray={savedArray}
          openErrorWindow={openErrorPopupSearch}
          isLoading={isLoading}
        />
        
        <ProtectedRoute
          loggedIn={loggedIn}
          path="/saved-movies"
          component={SavedMovies}
          onMovieLike={onMovieLike}
          savedArray={savedArray}
          onMovieDelete={onMovieDelete}
          openErrorWindow={openErrorPopupSearch}
          isLoading={isLoading}
        />
        
        <ProtectedRoute
          loggedIn={loggedIn}
          path="/profile"
          component={Profile}
          isLoading={isLoading}
          handleEditProfile={handleEditProfile}
          signOut={signOut}
        />
      
        <Route path="/signup">
					{
            () => !loggedIn ? <Register handleRegister={handleRegister} /> : <Redirect to="/movies" />
          }
        </Route>
        
        <Route path="/signin">
					{
            () => !loggedIn ? <Login handleLogin={handleLogin} /> : <Redirect to="/movies" />
          }		
        </Route>
        
        <Route path="/*">
					<NotFound />		
        </Route>
			
      </Switch>
      
      {pathname === '/' || pathname === '/movies' || pathname === '/saved-movies' ? <Footer /> : ''}
      
      <InfoTooltip 
        image={failIcon} 
        text={message} 
        isOpen={errorPopupOpen}  
        isClose={closeErrorPopup}
      />
      
    </CurrentUserContext.Provider>  
		</div>	
	);
}

export default App;

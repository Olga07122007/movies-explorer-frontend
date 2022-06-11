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
import * as moviesAuth from '../../utils/moviesAuth.js';
import api from '../../utils/Api';

function App() {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const { pathname } = useLocation();
  console.log(pathname);
  
  // отображение начального профиля
  useEffect(() => {
    checkToken();
    
    if (loggedIn) {
      
      api._headers.authorization = `Bearer ${localStorage.getItem('token')}`;
      api.getBasicInformation()
			.then((userData) => {
        setCurrentUser(userData);
        history.push(pathname);
      })
			.catch(err => {
				console.log(`Ошибка: ${err}`);
			});
    }
  }, [loggedIn]);
  
  // регистрация
  function handleRegister(name, email, password) {
    moviesAuth.register(name, email, password)
			.then((res) => {
				if(res) {
					history.push('/signin');
				}
			})	
			.catch((err) => {
				console.log(`Ошибка: ${err}`);
			});
  }
  
  // авторизация
	function handleLogin(email, password) {
		moviesAuth.login(email, password)
			.then((res) => {
				if(res.token) {
          localStorage.setItem('token', res.token);
          setLoggedIn(true);
          history.push('/movies');
				}
			})
      .catch((err) => {
				console.log(`Ошибка: ${err}`);
			});
	}
  
  // проверка токена
	function checkToken() {
		if (localStorage.getItem('token')) {
			const jwt = localStorage.getItem('token');
      moviesAuth.check(jwt)
				.then((res) => {
					setLoggedIn(true);
          
				})
        .then (()=> {
          history.push(pathname);
        })
				.catch((err) => {
					console.log(`Ошибка: ${err}`);
				});
		}
	}
  
  // изменение профиля
  function handleEditProfile(data) {
    api.editProfile(data)
      .then(result => {
        setCurrentUser(result);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }
  
  // выход
	function signOut() {
		localStorage.removeItem('token');
		setLoggedIn(false);
    history.push('/');
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
          
        />
        
        <ProtectedRoute
          loggedIn={loggedIn}
          path="/saved-movies"
          component={SavedMovies}
          
        />
        
        <ProtectedRoute
          loggedIn={loggedIn}
          path="/profile"
          component={Profile}
          
          handleEditProfile={handleEditProfile}
          signOut={signOut}
        />
      
        <Route path="/signup">
					{
            () => !loggedIn ? <Register handleLogin={handleLogin} /> : <Redirect to="/movies" />
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
      
    </CurrentUserContext.Provider>  
		</div>	
	);
}

export default App;

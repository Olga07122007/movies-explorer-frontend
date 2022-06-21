import './SearchForm.css';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function SearchForm({ getMovies, checkedShotMovies, shortMovies, inputValue, getSavedMovies, openErrorWindow }) {
  const [keyWords, setKeyWords] = useState(inputValue);
  const { pathname } = useLocation();
  
  // значение инпута при загрузке
  useEffect(() => {
    setKeyWords(inputValue);
  }, [inputValue]);
  
  //данные инпута
  const handleChange = (e) => {
    setKeyWords(e.target.value);
  };
	
  // переключение короткометражек
	function handleChangeShotFilms(e) {
    checkedShotMovies();
  }
	
	// поиск фильмов
	function handleSubmit(e) {
		e.preventDefault();
    if (keyWords === '') {
      openErrorWindow('Нужно ввести ключевое слово');
    }
    else {
      pathname==='/movies' ? getMovies(keyWords) : getSavedMovies(keyWords);
    }
  } 
  
  return (
    <section className="search">
      <div className="search__container">
        <div className="search__icon"></div>
        <form className="search__form" name="searchForm" onSubmit={handleSubmit} noValidate>
          <input 
            className="search__input" 
            value={keyWords || ''} 
            onChange={handleChange} 
            type="text" 
            name="filmInput" 
            id="filmInput" 
            required 
            placeholder="Фильм" 
            minLength="1" 
            maxLength="100" 
          />
          <button type="submit" className="search__search-btn"></button>
        </form>
        <div className="search__shortFilms">
          <div className="search__checkbox-group">
            <input type="checkbox" checked={shortMovies ? true : false} onChange={handleChangeShotFilms} className="search__checkbox" id="checkbox" />
            <label htmlFor="checkbox" className="search__checkbox-label"></label>
          </div>
          <p className="search__shortFilms-text">Короткометражки</p>
        </div>
      </div>
    </section>
  );
}

export default SearchForm;
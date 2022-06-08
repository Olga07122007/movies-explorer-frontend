import './SearchForm.css';

function SearchForm() {
  return (
    <section className="search">
      <div className="search__container">
        <div className="search__icon"></div>
        <form className="search__form" name="searchForm" noValidate>
          <input className="search__input" type="text" name="filmInput" id="filmInput" placeholder="Фильм" required minLength="2" maxLength="100" />
          <button type="submit" className="search__search-btn"></button>
        </form>
        <div className="search__shortFilms">
          <div className="search__checkbox-group">
            <input type="checkbox" className="search__checkbox" id="checkbox" />
            <label htmlFor="checkbox" className="search__checkbox-label"></label>
          </div>
          <p className="search__shortFilms-text">Короткометражки</p>
        </div>
      </div>
    </section>
  );
}

export default SearchForm;
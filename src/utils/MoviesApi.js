//обработка ошибок
const onError = res => {
  if (res.ok) {
    return res.json();
    console.log(res.json);
  }
  return Promise.reject(`Что-то пошло не так: ${res.status}`);
};

//класс Movi
class Movi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
		
	};
	
	//добавление массива фильмов
  getInitialCards() {
		return fetch(`${this._baseUrl}`)
      .then (onError);
    };
}

//создание экземпляра класса Movi
const movi = new Movi({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies'
  
});

export default movi;
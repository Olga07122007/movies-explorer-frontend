import { Link } from 'react-router-dom';
import './AboutMe.css';
import photo from '../../images/student-photo.jpg';

function AboutMe() {
  return (
    <section className="student" id="about-me">
      <h2 className="student__section-title">Студент</h2>
      <div className="student__description">
        <div className="student__column">
          <h3 className="student__title">Виталий</h3>
          <p className="student__subtitle">Фронтенд-разработчик, 30 лет</p>
          <p className="student__text">Я родился и живу в Саратове, закончил факультет экономики СГУ. 
          У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. 
          Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». 
          После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и 
          ушёл с постоянной работы.</p>
          <div className="student__links">
            <a className="student__link" href="https://github.com/Olga07122007" target="blank">Facebook</a>
            <a className="student__link" href="https://github.com/Olga07122007" target="blank">Github</a>
          </div>
        </div>
        <div className="student__column">
          <img className="student__photo" src={photo} />
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
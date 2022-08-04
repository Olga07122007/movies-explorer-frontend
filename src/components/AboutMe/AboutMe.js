import './AboutMe.css';
import photo from '../../images/student-photo.png';

function AboutMe() {
  return (
    <section className="student" id="about-me">
      <h2 className="student__section-title">Студент</h2>
      <div className="student__description">
        <div className="student__column">
          <h3 className="student__title">Ольга</h3>
          <p className="student__subtitle">Начинающий WEB-разработчик</p>
          <p className="student__text">Я родилась и живу в г. Петрозаводске, закончила факультет экономики РАНХиГС. 
          Интересуюсь программированием с 2019 года. В 2022 г. прошла курсы по WEB-разработке от Яндекс Практикума. 
          Очень хочу развиваться и дальше в этой области. Я люблю слушать музыку и гулять по лесу, увлекаюсь плаванием и лыжами.</p>
          <div className="student__links">
            <a className="student__link" href="https://github.com/Olga07122007" target="blank">Facebook</a>
            <a className="student__link" href="https://github.com/Olga07122007" target="blank">Github</a>
          </div>
        </div>
        <div className="student__column">
          <img className="student__photo" src={photo} alt="студент"/>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
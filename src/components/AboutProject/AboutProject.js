import { Link } from 'react-router-dom';
import './AboutProject.css';

function AboutProject() {
  return (
    <section className="about" id="about-project">
        <h2 className="about__section-title">О проекте</h2>
        <div className="about__description">
          <div className="about__column">
            <h3 className="about__title">Дипломный проект включал 5 этапов</h3>
            <p className="about__main-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          </div>
          <div className="about__column">
            <h3 className="about__title">На выполнение диплома ушло 5 недель</h3>
            <p className="about__main-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </div>
        </div>
        <div className="about__download">
          <div className="about__download-section">
            <p className="about__download-text download-background-green">1 неделя</p>
            <p className="about__download-text">Back-end</p>
          </div>
          <div className="about__download-section">
            <p className="about__download-text download-background-grey">4 недели</p>
            <p className="about__download-text">Front-end</p>
          </div>
        </div>
      </section>
  );
}

export default AboutProject;
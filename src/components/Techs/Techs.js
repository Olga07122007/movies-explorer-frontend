import './Techs.css';

function Techs() {
  return (
    <section className="technologies" id="techs">
      <h2 className="technologies__section-title">Технологии</h2>
      <h3 className="technologies__title">7 технологий</h3>
      <p className="technologies__description">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <div className="technologies__buttons">
        <div className="technologies__button">HTML</div>
        <div className="technologies__button">CSS</div>
        <div className="technologies__button">JS</div>
        <div className="technologies__button">React</div>
        <div className="technologies__button">Git</div>
        <div className="technologies__button">Express.js</div>
        <div className="technologies__button">mongoDB</div>
      </div>
    </section>
  );
}

export default Techs;
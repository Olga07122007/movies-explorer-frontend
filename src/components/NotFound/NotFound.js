import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  return (
    <main className="main">
      <section className="notFound">
        <div className="notFound__container">
          <h1 className="notFound__title">404</h1>
          <p className="notFound__description">страница не найдена</p>
					<Link to="/" className="notFound__link">Назад</Link>
        </div>
      </section>
    </main>
  );
}

export default NotFound;
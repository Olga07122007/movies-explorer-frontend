import './InfoTooltip.css';

function InfoTooltip({ image, text, isOpen, isClose }) {
	
	return (
		<div className={`popup ${isOpen ? 'popup_opened': ''}`}>
			<div className="popup__container">
				<img className="popup__success-icon" src={image} />
				<h3 className="popup__title">{text}</h3>
				<button type="button" className="popup__close-icon" onClick={isClose} />
			</div>
		</div>
	);
}

export default InfoTooltip;
import infoImageSuccess from "../images/black-union.svg";
import infoImageFailure from "../images/red-union.svg";
import { useNavigate } from 'react-router-dom';
import Popup from "./Popup";

function InfoTooltip(props) { 

  const navigate = useNavigate();

  const isRegisterSuccess = () => {
    return props.isRegisterSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз.";
  };

  const closeInfoPopup = () => {
    props.isRegisterSuccess && navigate('/sign-in', {replace: true});
    props.onClose();
  };

  return (
    <Popup isOpen={props.isOpen} onClose={closeInfoPopup} popupContainer="info-popup__container">      
      <img className="info-popup__image" alt={isRegisterSuccess()} src={props.isRegisterSuccess ? infoImageSuccess : infoImageFailure} />
      <p className="info-popup__text">{isRegisterSuccess()}</p>
    </Popup>
  )
}

export default InfoTooltip;
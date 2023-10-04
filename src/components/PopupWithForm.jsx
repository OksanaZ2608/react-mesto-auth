import React from "react";
import closeIcon from "../images/popup_clouse_btn.svg";
function PopupWithForm({ name, isOpen, buttonText, onClose, title, children, onSubmit, isValid = true }) {

  return (
    <div className={`popup popup__${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <form className={`popup__form popup__form_type${name}`} name={name}  onSubmit={onSubmit} noValidate>
          <h2 className="popup__text">{title}</h2>
          {children}
          <button type="submit" className={`popup__submit-btn popup__submit-btn_type_${name} ${isValid ? '' : 'popup__submit-btn_disable'}`}>
            {buttonText}
          </button>
        </form>
        <button type="button" className="popup__close-btn" onClick={onClose}>
          <img
            src={closeIcon}
            alt="закрывающий крестик"
          />
        </button>
        
      </div>
    </div>
  );
}
export default PopupWithForm;
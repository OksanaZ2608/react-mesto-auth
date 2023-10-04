import React from "react";
import closeIcon from "../images/popup_clouse_btn.svg";
function ImagePopup({card, onClose, isOpen}) {
  return (
    <div
      className={`popup popup-zoom-cards ${isOpen && "popup_opened"}`}
    >
      <figure className="popup__container_type_zoom">
        <img
          src={card ? card.link : ""}
          alt={card ? card.name : ""}
          className="popup__zoom-image"
        />
        <figcaption className="popup__zoom-title">
          {card ? card.name : ""}
        </figcaption>
        <button type="button" className="popup__close-btn">
          <img
            src={closeIcon}
            alt="закрывающий крестик"
            onClick={onClose}
          />
        </button>
      </figure>
    </div>
  );
}

export default ImagePopup;
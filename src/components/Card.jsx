import {useContext} from 'react';
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card({ card, onClickImage, onCardLike, onCardDislike, onCardDelete }) {

  const currentUser = useContext(CurrentUserContext);  
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  const handleLikeClick = () => {
    isLiked ? onCardDislike(card) : onCardLike(card);      
  };

  const handleCardClick = () => {
    onClickImage(card);    
  };

  const handleDeleteClick = () => {
    onCardDelete(card);
  };
  
  return (
    <li className="element">
      <button className={`element__delete-btn ${isOwn && 'element__delete-btn_active'}`} name="card-delete" type="button" value="delete-card" onClick={handleDeleteClick}></button>
      <img className="element__image" alt={card.name} src={card.link} onClick={handleCardClick} />
      <div className="element__block">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-place">
          <button className={`element__like ${isLiked && 'element__like-active'}`} name="card-like" type="button" value="add-like" onClick={handleLikeClick}></button>
          <p className="element__like-count">{card.likes.length}</p>
        </div>
      </div>
    </li>
  )
}

export default Card;
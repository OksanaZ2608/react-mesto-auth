import {useContext} from 'react';
import Card from "./Card";
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Main(props) {  

  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <button className="profile__avatar-btn" onClick={props.onEditAvatar}>
          <img className="profile__avatar" alt="Аватар" src={currentUser.avatar} />
        </button>
        <div className="profile__info">
        <div className="profile__edit-user">
          <h1 className="profile__user">{currentUser.name}</h1>
          <button className="profile__edit" type="button" name="edit-button" value="open-popup" onClick={props.onEditProfile}></button>
          </div>
          <p className="profile__about-user">{currentUser.about}</p>
        </div>
        <button className="profile__add-button" name="add-button" type="button" value="add-picture" onClick={props.onAddPlace}></button>
      </section>
      <section className="cards">
        <ul className="elements">        
          {
            props.cards.map((card) => <Card onCardDelete={props.onCardDelete} onCardLike={props.onCardLike} onCardDislike={props.onCardDislike} onClickImage={props.onImage} key={card._id} card={card} />)
          }        
        </ul>
      </section>
    </main>
  )
}

export default Main;
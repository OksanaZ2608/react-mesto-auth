import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import auth from '../utils/auth.js';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Login from './Login';
import Register from './Register';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import ImagePopup from "./ImagePopup";
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import api from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [isInfoPopupOpen, setInfoPopupOpen] = useState(false);

  const [isRegisterSuccess, setRegisterSuccess] = useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cardId, setCardId] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const [cards, setCards] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    api.getInitialCards().then(data => {
      setCards(data);
    })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    api.getUserInfo().then(userInfo => {
      setCurrentUser(userInfo);
    })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    handleTokenCheck();
  }, [loggedIn]);

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleImageClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }

  function handleTrashClick() {
    setConfirmPopupOpen(true);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setImagePopupOpen(false);
    setConfirmPopupOpen(false);
    setInfoPopupOpen(false);
    setSelectedCard({});
  }

  function handleCardLike(card) {
    api.addLike(card._id).then((newCard) => {
      const newCards = cards.map((item) => item._id === card._id ? newCard : item);
      setCards(newCards);
    })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDislike(card) {
    api.deleteLike(card._id).then((newCard) => {
      const newCards = cards.map((item) => item._id === card._id ? newCard : item);
      setCards(newCards);
    })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleConfirmDelete(card) {
    handleTrashClick();
    setCardId(card._id);
  }

  function handleCardDelete(cardId) {
    api.deleteCard(cardId).then(() => {
      const newCards = cards.filter(item => item._id !== cardId);
      setCards(newCards);
      closeAllPopups();
    })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleUpdateUser(info) {
    api.setUserInfo(info.name, info.about).then((newUserInfo) => {
      setCurrentUser(newUserInfo);
      closeAllPopups();
    })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleUpdateAvatar(info) {
    api.changeAvatar(info.avatar).then((newAvatar) => {
      setCurrentUser(newAvatar);
      closeAllPopups();
    })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleAddPlaceSubmit(card) {
    api.addNewCard(card.name, card.link).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleRegistrationSubmit(password, email) {
    auth.registerUser(password, email)
      .then((res) => {
        if (res) {
          setRegisterSuccess(true)
          navigate('/sign-in')
        } 
      })
      .catch((err) => {
        setRegisterSuccess(false)
        console.log(`Ошибка регистрации ${err}`)
      })
      .finally(() => setInfoPopupOpen(true))
  }

  function handleAuthSubmit(password, email) {
    auth.authorizeUser(password, email)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          setLoggedIn(true);
          navigate('/', { replace: true });
        }
      })
      .catch((err) => {
        setInfoPopupOpen(true)
        console.log(`Ошибка авторизации ${err}`)
      })
  }

  function handleSignOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate('/sign-in', { replace: true });
  }

  const handleTokenCheck = () => {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      auth.checkToken(token)
        .then((res) => {
          if (res && res.data) {
            setUserEmail(res.data.email);
            setLoggedIn(true);
            navigate('/', { replace: true });
          }
        })
        .catch((err) => {console.log(`Ошибка токена ${err}`)})
    }
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Header loggedIn={loggedIn} userEmail={userEmail} signOut={handleSignOut} />
          <Routes>
            <Route path="*" element={loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />} />
            <Route path="/" element={<ProtectedRoute element={Main} loggedIn={loggedIn} cards={cards} onCardDelete={handleConfirmDelete} onCardLike={handleCardLike} onCardDislike={handleCardDislike} onImage={handleImageClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} />} />
            <Route path="/sign-in" element={<Login onAuthSubmit={handleAuthSubmit} />} />
            <Route path="/sign-up" element={<Register onRegisterUser={handleRegistrationSubmit} />} />
          </Routes>
          <Footer />
          <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
          <AddPlacePopup onAddPlace={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
          <ConfirmDeletePopup cardId={cardId} onCardDelete={handleCardDelete} isOpen={isConfirmPopupOpen} onClose={closeAllPopups} />
          <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={isImagePopupOpen} />
          <InfoTooltip onClose={closeAllPopups} isOpen={isInfoPopupOpen} isRegisterSuccess={isRegisterSuccess} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
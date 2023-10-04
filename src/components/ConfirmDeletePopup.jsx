import PopupWithForm from "./PopupWithForm";

function ConfirmDeletePopup({ onCardDelete, isOpen, onClose, cardId }) { 

  function handleSubmit(e) {
    e.preventDefault();    
    onCardDelete(cardId);
  }

  return (
    <PopupWithForm  onSubmit={handleSubmit} onClose={onClose} name="confirm-popup" title="Вы уверены?" buttonText="Да" isOpen={isOpen} />
  )
}

export default ConfirmDeletePopup;
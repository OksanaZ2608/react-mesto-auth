import React from "react";
import PopupWithForm from "./PopupWithForm";
import useFormValidation from "../utils/useFormValidation";

function AddPlacePopup({ onAddPlace, isOpen, onClose }) {
  const {values,errors,isInputValid, isValid, handleChange, reset} = useFormValidation();

 
  function resetClose(){
    onClose()
    reset()
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({name: values.name, link: values.link}, reset);
  }
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={resetClose}
      title={"Новое место"}
      buttonText={"Создать"}
      name={"cards"}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        className={`popup__input popup__input_type_imagename ${isInputValid.name === undefined || isInputValid.name ? '' : 'popup__input_valid_error'} `}
        type="text"
        name="name"
        autoComplete="off"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        onChange={handleChange}
        value={values.name ? values.name : ''}
      />
      <span className="popup__input-error popup__input-imagename">{errors.name}</span>
      <input
        className={`popup__input popup__input_type_url ${isInputValid.link === undefined || isInputValid.link ? '' : 'popup__input_valid_error'} `}
        type="url"
        name="link"
        autoComplete="off"
        placeholder="Ссылка на картинку"
        required
        onChange={handleChange}
        value={values.link ? values.link : ''}
      />
      <span className="popup__input-error popup__input-url">{errors.link}</span>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
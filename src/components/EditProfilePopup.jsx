import { useContext, useEffect } from "react";
import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import useFormValidation from "../utils/useFormValidation";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, errors, isValid, isInputValid, setValue, reset, handleChange } = useFormValidation();

  // всталяем значение в инпуты
  useEffect(() => {
    setValue("name", currentUser.name)
    setValue("about", currentUser.about)
  }, [currentUser, isOpen, setValue])

  function resetClose() {
    onClose()
    reset({ name: currentUser.name, about: currentUser.about })
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({ name: values.name, about: values.about }, reset)
  }
  return (
    <PopupWithForm
      name={"profile"}
      title={"Редактировать профиль"}
      isOpen={isOpen}
      onClose={resetClose}
      buttonText={"Сохранить"}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        className={`popup__input popup__input_type_username ${isInputValid.name === undefined || isInputValid.name ? '' : 'popup__input-error'}`}
        type="text"
        name="name"
        id="name"
        autoComplete="off"
        minLength="2"
        maxLength="40"
        required=""
        placeholder="Ваше имя"
        value={values.name ? values.name : ''}
        onChange={handleChange}
      />
      <span
        id="error-username"
        className="popup__input-error popup__input-username"
      >{errors.name}</span>
      <input
        className={`popup__input popup__input_type_job ${isInputValid.about === undefined || isInputValid.about ? '' : 'popup__input-error'}`}
        type="text"
        name="about"
        id="about-input"
        autoComplete="off"
        minLength="2"
        maxLength="200"
        required
        placeholder="О себе"
        value={values.about ? values.about : ''}
        onChange={handleChange}
      />
      <span
        id="error-job"
        className="popup__input-error popup__input-description"
      >{errors.job}</span>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";
import useFormValidation from "../utils/useFormValidation";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();
  const { values, errors, isValid, isInputValid, reset, handleChange } = useFormValidation();

  function resetClose() {
    onClose()
    reset()
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({ avatar: avatarRef.current.value }, reset);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={resetClose}
      title="Обновить аватар"
      buttonText="Сохранить"
      name="avatar"
      form={"form"}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        ref={avatarRef}
        type="url"
        className={`popup__input popup__input_type_avatar ${isInputValid.link === undefined || isInputValid.link ? '' : 'popup__input_valid_error'} `}
        name="avatar"
        placeholder="Ссылка на новый аватар"
        value={values.avatar ? values.avatar : ''}
        id="url"
        minLength="2"
        required
        onChange={handleChange}
        autoComplete="off"
      />
      <span
        id="error-url"
        className="popup__input-error avatar-link-input-error"
      >{errors.link}</span>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
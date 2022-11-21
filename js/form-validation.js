import { isEscapeKey } from './util.js';
import { setScale, scaleValue, DEFAULT_SCALE_NUMBER } from './scale-editor.js';
import { uploadPhoto } from './api.js';

const COMMENT_MIN_LENGTH = 20;
const COMMENT_MAX_LENGTH = 140;

// добавляю аттрибуты формам
const allForms = document.querySelectorAll('form');
allForms.forEach((item) => {
  item.method = 'post';
  item.action = 'https://27.javascript.pages.academy/kekstagram-simple';
  item.enctype = 'multipart/form-data';
});

const imgUploadsForm = document.querySelector('#upload-select-image');

// комментарий обязателен для заполнения
const commentInput = document.querySelector('.text__description');
commentInput.required = true;

const uploadFileInput = document.querySelector('#upload-file');
const uploadCancelButton = document.querySelector('#upload-cancel');

const submitButton = document.querySelector('#upload-submit');
const successMessage = document.querySelector('#success')
  .content
  .querySelector('.success')
  .cloneNode(true);
const successButton = successMessage.querySelector('.success__button');

const errorMessage = document.querySelector('#error')
  .content
  .querySelector('.error')
  .cloneNode(true);
const errorButton = errorMessage.querySelector('.error__button');

function onOpenUploadFormEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (commentInput === document.activeElement) {
      return evt;
    }
    onUploadCancelButtonClick();
  }
}

function onUploadFileChange(evt) {
  evt.preventDefault();
  document.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.body.classList.add('modal-open');

  uploadFileInput.removeEventListener('change', onUploadFileChange);
  uploadCancelButton.addEventListener('click', onUploadCancelButtonClick);
  document.addEventListener('keydown', onOpenUploadFormEscKeydown);
  setScale();
}

function formRender() {
  uploadFileInput.addEventListener('change', onUploadFileChange);
}

function onUploadCancelButtonClick() {
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  document.body.classList.remove('modal-open');
  // uploadFileInput.value = '';
  // scaleValue.value = `${DEFAULT_SCALE_NUMBER}%`;
  // commentInput.value = '';
  // imgUploadsForm.reset();
  // const formData = new FormData();
  // formData.set('scale', 100);
  // formData.set('effect', 'none');
  // formData.set('description', '');


  document.removeEventListener('keydown', onOpenUploadFormEscKeydown);
  uploadFileInput.addEventListener('change', onUploadFileChange);
}

// валидация
const pristine = new Pristine(imgUploadsForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error',
}, false);

// проверка на длинну строки для textarea
function checkLength(checkedString) {
  return checkedString.length <= COMMENT_MAX_LENGTH && checkedString.length >= COMMENT_MIN_LENGTH;
}

pristine.addValidator(
  commentInput,
  checkLength,
  'Длина комментария не менее 20 и не более 140 символов'
);

//блокировка кнопки "Отправить"
function blockSubmitButton() {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикуем...';
}

//разблокировка кнопки "Отправить"
function unblockSubmitButton() {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
}

//закрытие окна с сообщением об успешной отправке
function onSuccessButtonClick() {
  successMessage.remove();
  onUploadCancelButtonClick();
  successButton.removeEventListener('click', onSuccessButtonClick);
  document.removeEventListener('keydown', onSuccessMessageEscKeydown);
  document.removeEventListener('click', onSuccessMessageOutsideClick);
}

function onSuccessMessageEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onSuccessButtonClick();
  }
}

function onSuccessMessageOutsideClick(evt) {
  const successInner = successMessage.querySelector('.success__inner');
  if (!successInner.contains(evt.target)) {
    onSuccessButtonClick();
  }
}

//закрытие окна с сообщением об ошибке
function onErrorButtonClick() {
  errorMessage.remove();
  errorButton.removeEventListener('click', onErrorButtonClick);
  document.removeEventListener('keydown', onErrorMessageEscKeydown);
  document.removeEventListener('click', onErrorMessageOutsideClick);
}

function onErrorMessageEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onErrorButtonClick();
  }
}

function onErrorMessageOutsideClick(evt) {
  const errorInner = errorMessage.querySelector('.error__inner');
  if (!errorInner.contains(evt.target)) {
    onErrorButtonClick();
  }
}

// слушатель формы
function onImgFormSubmit(onSuccess) {
  imgUploadsForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      uploadPhoto(
        evt,
        () => {
          onSuccess();
          unblockSubmitButton();
          document.body.append(successMessage);
          successButton.addEventListener('click', onSuccessButtonClick);
          document.addEventListener('keydown', onSuccessMessageEscKeydown);
          document.addEventListener('click', onSuccessMessageOutsideClick);
        },
        () => {
          unblockSubmitButton();
          document.body.append(errorMessage);
          errorButton.addEventListener('click', onErrorButtonClick);
          document.addEventListener('keydown', onErrorMessageEscKeydown);
          document.addEventListener('click', onErrorMessageOutsideClick);
        },
      );
    }
  });
}

export { formRender, onImgFormSubmit, onUploadCancelButtonClick };

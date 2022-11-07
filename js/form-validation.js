import { isEscapeKey } from './util.js';
import { setScale, scaleValue, DEFAULT_SCALE_NUMBER } from './scale-editor.js';

const COMMENT_MIN_LENGTH = 20;
const COMMENT_MAX_LENGTH = 140;


// добавляю аттрибуты формам
const allForms = document.querySelectorAll('form');
allForms.forEach((item) => {
  item.method = 'post';
  item.action = 'https://27.javascript.pages.academy/kekstagram-simple';
  item.enctype = 'multipart/form-data';
});

// комментарий обязателен для заполнения

const commentInput = document.querySelector('.text__description');
commentInput.required = true;

const uploadFileInput = document.querySelector('#upload-file');
const uploadCancelButton = document.querySelector('#upload-cancel');

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
  uploadFileInput.value = '';
  scaleValue.value = `${DEFAULT_SCALE_NUMBER}%`;
  commentInput.value = '';

  document.removeEventListener('keydown', onOpenUploadFormEscKeydown);
  uploadFileInput.addEventListener('change', onUploadFileChange);
}

const imgUploadsForm = document.querySelector('#upload-select-image');

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

// слушатель формы
imgUploadsForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    imgUploadsForm.submit();
  }
});

export {formRender};

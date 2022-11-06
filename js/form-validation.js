import { isEscapeKey } from './util.js';
import {setScale} from './scale-editor.js';

const HASHTAGS_VALID_REGEX = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const HASHTAGS_MAX_AMOUNT = 5;
const COMMENT_MAX_LENGTH = 140;


// добавляю аттрибуты формам
const allForms = document.querySelectorAll('form');
allForms.forEach((item) => {
  item.method = 'post';
  item.action = 'https://27.javascript.pages.academy/kekstagram-simple';
  item.enctype = 'multipart/form-data';
});

// хэштеги и комментарии необязательны для заполнения, остальные - обязательны.

const hashtagsInput = document.querySelector('.text__hashtags');
hashtagsInput.type = 'text';

const commentInput = document.querySelector('.text__description');

const uploadFileInput = document.querySelector('#upload-file');
const uploadCancelButton = document.querySelector('#upload-cancel');

function onOpenUploadFormEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (hashtagsInput === document.activeElement || commentInput === document.activeElement) {
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
  // document.querySelector('.img-upload__preview img').src = ''; // эта строчка вызывает ошибку с повторной загрузкой изображения, поле закрытия окна

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

// проверка по регулярному выражению
function checkSingleHashtagFormat(values) {
  if (values === '') {
    return true;
  }
  const result = values
    .trim()
    .split(' ')
    .every((value) => HASHTAGS_VALID_REGEX.test(value));
  return result;
}

pristine.addValidator(
  hashtagsInput,
  checkSingleHashtagFormat,
  'Хэш-тег должен начинаться с символа # (решётка). Быть длинной от 2х до 20ти символов, и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.'
);

// проверка на количество хэштэгов
function checkHashtagsAmount(values) {
  return values.trim().split(' ').length <= HASHTAGS_MAX_AMOUNT;
}

pristine.addValidator(
  hashtagsInput,
  checkHashtagsAmount,
  `Не более ${HASHTAGS_MAX_AMOUNT} хэш-тегов`
);

// проверка на повторяющиеся хэш-тэги
function checkOnSimilarHashtags(values) {
  const countHashtags = values
    .toLowerCase()
    .trim()
    .split(' ');
  return new Set(countHashtags).size === countHashtags.length;
}

pristine.addValidator(
  hashtagsInput,
  checkOnSimilarHashtags,
  'Один и тот же хэш-тег не может быть использован дважды'
);

// проверка на длинну строки для textarea
function checkLength(checkedString) {
  if (checkedString.length <= COMMENT_MAX_LENGTH) {
    return true;
  }
  return false;
}

pristine.addValidator(
  commentInput,
  checkLength,
  'Длина комментария не более 140 символов'
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

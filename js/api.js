import { showAlert } from './util.js';

const URL_GET = 'https://27.javascript.pages.academy/kekstagram-simple/data';
const URL_POST = 'https://27.javascript.pages.academy/kekstagram-simple';

function downloadData(onSuccess) {
  return function () {
    fetch(URL_GET)
      .then((response) => response.ok ? response.json() : showAlert('Ошибка: не удалось получить данные') )
      .then((data) => {
        onSuccess(data);
      })
      .catch(() => {
        showAlert('Ошибка: не удалось получить данные');
      });
  };
}

function uploadPhoto(evt, onSuccess, onError) {
  fetch(
    URL_POST,
    {
      method: 'POST',
      body: new FormData(evt.target),
    },
  )
    .then((response) => response.ok ? onSuccess() : onError('Отправка формы не удалась, попробуйте ещё раз'))
    .catch(() => {
      onError('Отправка формы не удалась, попробуйте ещё раз');
    });
}


export { downloadData, uploadPhoto, URL_POST, URL_GET };

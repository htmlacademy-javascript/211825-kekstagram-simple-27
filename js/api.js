import { showAlert } from './util.js';

function downloadData(onSuccess) {
  return function () {
    fetch('https://27.javascript.pages.academy/kekstagram-simple/data')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        showAlert('Ошибка: не удалось получить данные');
      })
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
    'https://27.javascript.pages.academy/kekstagram-simple',
    {
      method: 'POST',
      body: new FormData(evt.target),
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError('Отправка формы не удалась, попробуйте ещё раз');
      }
    })
    .catch(() => {
      onError('Отправка формы не удалась, попробуйте ещё раз');
    });
}


export { downloadData, uploadPhoto };

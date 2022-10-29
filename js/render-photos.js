// Отобразить фотографии других пользователей.

//     Заведите модуль, который будет отвечать за отрисовку миниатюр.

//     На основе временных данных для разработки и шаблона #picture создайте DOM-элементы, соответствующие фотографиям, и заполните их данными:
//         Адрес изображения url подставьте как атрибут src изображения.
//         Количество лайков likes выведите в блок .picture__likes.
//         Количество комментариев comments выведите в блок .picture__comments.

//     Отрисуйте сгенерированные DOM-элементы в блок .pictures. Для вставки элементов используйте DocumentFragment.
// const fragment = document.createDocumentFragment(); // Создаём "коробочку"
// fragment.appendChild(newElement); // Складываем созданные элементы в "коробочку"
// pool.appendChild(fragment); // И только в конце отрисовываем всё из "коробочки"

//     Подключите модуль в проект.

/* <template id="picture">
    <a href="#" class="picture">
      <img class="picture__img" src="" width="182" height="182" alt="Случайная фотография">
      <p class="picture__info">
        <span class="picture__comments"></span>
        <span class="picture__likes"></span>
      </p>
    </a>
  </template> */



const picturesContainer = document.querySelector('.pictures');
const templatePictureFragment = document.querySelector('#picture').content;
const templatePicture = templatePictureFragment.querySelector('a');
const fragment = document.createDocumentFragment();

function createPicture (data) {
  for (let i = 0, i < data.length, i++) {
    const picture = templatePicture.cloneNode(true);
    picture.classList.add('picture');

    fragment.appendChild(picture);
  }
  picturesContainer.appendChild(fragment);
}

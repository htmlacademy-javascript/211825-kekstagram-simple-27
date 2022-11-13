const picturesContainer = document.querySelector('.pictures');

function renderPhotos (photos) {
  const templatePicture = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  const fragment = document.createDocumentFragment();

  photos.forEach(({ url, likes, comments }) => {
    const picture = templatePicture.cloneNode(true);
    picture.querySelector('.picture__img').src = url;
    picture.querySelector('.picture__likes').textContent = likes;
    picture.querySelector('.picture__comments').textContent = comments;
    fragment.appendChild(picture);
  });

  picturesContainer.appendChild(fragment);
}

export {renderPhotos};
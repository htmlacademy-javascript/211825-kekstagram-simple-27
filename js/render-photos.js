const picturesContainer = document.querySelector('.pictures');

function renderPhotos (photos) {
  const templatePicture = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  const fragment = document.createDocumentFragment();
  const pictureImg = templatePicture.querySelector('.picture__img');
  const pictureLikes = templatePicture.querySelector('.picture__likes');
  const pictureComments = templatePicture.querySelector('.picture__comments');

  photos.forEach(({ url, likes, comments }) => {
    const picture = templatePicture.cloneNode(true);
    pictureImg.src = url;
    pictureLikes.textContent = likes;
    pictureComments.textContent = comments;
    fragment.appendChild(picture);
  });

  picturesContainer.appendChild(fragment);
}

export {renderPhotos};

import { getRandomNumber } from './util.js';

const OBJECT_AMOUNT = 25;

const DESCRIPTIONS = [
  'My first photo',
  'Всем привет!',
  'А это я',
  'Я и мои чюваки',
  'Вот так вот',
  'Эта фотка из самого классного места',
  'Обычно не получается, но тут получилось',
  'Как вам? ',
  'Лучшее из того что наснимали',
  'Как то так получилось',
];

function createSingleObject (id) {
  return {
    id,
    url: `photos/${id}.jpg`,
    description: DESCRIPTIONS[getRandomNumber(0, DESCRIPTIONS.length - 1)],
    likes: getRandomNumber(15, 200),
    comments: getRandomNumber(0, 200),
  };
}


function createMockData (amount) {
  const photos = [];
  for (let i = 1; i <= amount; i++) {
    photos.push(createSingleObject(i));
  }
  return photos;
}

const allPhotos = createMockData(OBJECT_AMOUNT);

export { allPhotos };

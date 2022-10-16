function getRandomNumber(a, b) {
  if (a < 0 || b < 0) {
    return NaN;
  }
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function checkStringLength (string, length) {
  return string.length <= length;
}

getRandomNumber();
checkStringLength('d', 1);

const OBJECT_AMOUNT = 25;

const DESCRIPTION = [
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
    description: DESCRIPTION[getRandomNumber(0, DESCRIPTION.length - 1)],
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

createMockData(OBJECT_AMOUNT);



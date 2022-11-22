const scaleValue = document.querySelector('.scale__control--value');
scaleValue.readonly = 'readonly';
const scaleSmallerButton = document.querySelector('.scale__control--smaller');
const scaleBiggerButton = document.querySelector('.scale__control--bigger');
scaleBiggerButton.disabled = true;
const DEFAULT_SCALE_NUMBER = 100;
let scaleNumber = DEFAULT_SCALE_NUMBER;
const innerImage = document.querySelector('.img-upload__preview');

scaleValue.value = `${scaleNumber}%`;

function onScaleSmallerButtonClick() {
  scaleNumber = scaleNumber - 25;
  scaleValue.value = `${scaleNumber}%`;
  innerImage.style.transform = `scale(${scaleNumber / 100})`;
  if (scaleNumber === 25) {
    scaleSmallerButton.disabled = true;
    scaleBiggerButton.disabled = false;
  }
  scaleBiggerButton.disabled = false;
}

scaleSmallerButton.addEventListener('click', onScaleSmallerButtonClick);

function onScaleBiggerButtonClick() {
  scaleNumber = scaleNumber + 25;
  scaleValue.value = `${scaleNumber}%`;
  innerImage.style.transform = `scale(${scaleNumber / 100})`;
  if (scaleNumber === 100) {
    scaleBiggerButton.disabled = true;
    scaleSmallerButton.disabled = false;
  }
  scaleSmallerButton.disabled = false;
}

scaleBiggerButton.addEventListener('click', onScaleBiggerButtonClick);

function setScale() {
  scaleValue.value = `${scaleNumber}%`;
  return scaleValue.value;
}

function resetScale() {
  scaleNumber = DEFAULT_SCALE_NUMBER;
  scaleBiggerButton.disabled = false;
  scaleSmallerButton.disabled = false;
  scaleValue.value = `${DEFAULT_SCALE_NUMBER}%`;
}

export { setScale, scaleValue, DEFAULT_SCALE_NUMBER, resetScale };

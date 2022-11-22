const ALERT_SHOW_TIME = 7000;

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

function isEscapeKey(evt) {
  return evt.key === 'Escape';
}

function showAlert(message) {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '1';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.color = 'red';
  alertContainer.style.backgroundColor = 'white';
  alertContainer.style.border = '2px solid #d9534f';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

export { getRandomNumber, checkStringLength, isEscapeKey, showAlert };

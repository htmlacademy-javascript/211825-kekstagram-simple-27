const effectsRadioButtons = document.querySelectorAll('.effects__radio');
const effectsList =  document.querySelector('.effects__list');
const innerImage = document.querySelector('.img-upload__preview');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue =  document.querySelector('.effect-level__value');

const OVERLAY_EFFECTS = [
  {
    name: 'none',
    style: '',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  }
];

function setChrome(value) {
  innerImage.style.filter = `grayscale(${value})`;
}
function setSepia(value) {
  innerImage.style.filter = `sepia(${value})`;
}
function setMarvin(value) {
  innerImage.style.filter = `invert(${value}%)`;
}
function setPhobos(value) {
  innerImage.style.filter = `blur(${value}px)`;
}
function setHeat(value) {
  innerImage.style.filter = `brightness(${value})`;
}

effectsRadioButtons[0].checked = 'true';
innerImage.style.removeProperty('filter');
effectLevelSlider.classList.add('hidden');
innerImage.classList.add('effects__preview--none');

// effectsList.addEventListener('change', (evt) => {
//   effectLevelSlider.classList.remove('hidden');
//   innerImage.classList = 'img-upload__preview';
//   if (evt.target.value === 'none') {
//     innerImage.style.removeProperty('filter');
//     effectLevelSlider.classList.add('hidden');
//     innerImage.classList.add('effects__preview--none');
//   }
//   innerImage.classList.add(`effects__preview--${evt.target.value}`);
// });


noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  }
});

effectsList.addEventListener('change', (evt) => {
  effectLevelSlider.classList.remove('hidden');
  innerImage.classList = 'img-upload__preview';
  innerImage.classList.add(`effects__preview--${evt.target.value}`);
  switch (evt.target.value) {
    case 'none' :
      innerImage.style.removeProperty('filter');
      effectLevelSlider.classList.add('hidden');
      break;
    case 'chrome':
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
      setChrome(value);
      break;
    case 'sepia':
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
      setSepia(value);
      break;
    case 'marvin':
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100 ,
        },
        start: 100,
        step: 1,
      });
      setMarvin(value);
      break;
    case 'phobos':
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
      setPhobos(value);
      break;
    case 'heat':
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
      setHeat(value);
      break;
  }
});

// function setOverlay() {
//   const value = effectLevelValue.value;
//   effectsList.addEventListener('change', (evt) => {
//     switch (evt.target.value) {
//       case 'chrome' :
//         effectLevelSlider.noUiSlider.updateOptions({
//           range: {
//             min: 0,
//             max: 1,
//           },
//           start: 1,
//           step: 0.1,
//         });
//         setChrome(value);
//         break;
//       case 'sepia':
//         effectLevelSlider.noUiSlider.updateOptions({
//           range: {
//             min: 0,
//             max: 1,
//           },
//           start: 1,
//           step: 0.1,
//         });
//         setSepia(value);
//         break;
//       case 'marvin':
//         effectLevelSlider.noUiSlider.updateOptions({
//           range: {
//             min: 0,
//             max: 100 ,
//           },
//           start: 100,
//           step: 1,
//         });
//         setMarvin(value);
//         break;
//       case 'phobos':
//         effectLevelSlider.noUiSlider.updateOptions({
//           range: {
//             min: 0,
//             max: 3,
//           },
//           start: 3,
//           step: 0.1,
//         });
//         setPhobos(value);
//         break;
//       case 'heat':
//         effectLevelSlider.noUiSlider.updateOptions({
//           range: {
//             min: 1,
//             max: 3,
//           },
//           start: 3,
//           step: 0.1,
//         });
//         setHeat(value);
//         break;
//     }
//   });
// }


effectLevelSlider.noUiSlider.on('update', () => {
  effectLevelValue.value = effectLevelSlider.noUiSlider.get();
  // setOverlay(effectLevelValue.value);
});

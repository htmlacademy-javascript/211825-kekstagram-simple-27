// import { allPhotos } from './mock-data.js';
import { renderPhotos } from './render-photos.js';
import { formRender,onImgFormSubmit, onUploadCancelButtonClick } from './form-validation.js';
import { resetEffects } from './effects.js';
import { downloadData } from './api.js';

// renderPhotos(allPhotos);
formRender();
resetEffects();
const loadPhotos = downloadData(renderPhotos);
loadPhotos();

onImgFormSubmit(onUploadCancelButtonClick);

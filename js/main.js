import { allPhotos } from './mock-data.js';
import { renderPhotos } from './render-photos.js';
import { formRender } from './form-validation.js';
import { resetEffects } from './effects.js';

renderPhotos(allPhotos);
formRender();
resetEffects();

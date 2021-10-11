import {createAnnouncement} from './modules/datagen.js';
import {constants} from './modules/constants.js';

const similarAnnouncements = Array.from({length: constants.SIMILAR_ANNOUNCEMENT_COUNT}, createAnnouncement);
// eslint-disable-next-line no-console
console.log(similarAnnouncements);

import {createAnnouncement, SIMILAR_ANNOUNCEMENT_COUNT} from './modules/datagen.js';

const similarAnnouncements = Array.from({length: SIMILAR_ANNOUNCEMENT_COUNT}, createAnnouncement);
// eslint-disable-next-line no-console
console.log(similarAnnouncements);

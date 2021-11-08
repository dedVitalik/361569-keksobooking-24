import './modules/formatter.js';
import {makeFormInactive, makeFormActive, announcementsMap} from './modules/formandmap.js';
import {announcementsLoader} from './modules/serverapi.js';

makeFormInactive();
announcementsMap.on('load', makeFormActive());

// announcementsLoader(console.log, console.error);

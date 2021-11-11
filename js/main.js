import './modules/formatter.js';
import {makeFormInActive, makeFormActive, announcementsMap} from './modules/formandmap.js';
// import {announcementsLoader} from './modules/serverapi.js';

makeFormInActive();
announcementsMap.on('load', makeFormActive());

// announcementsLoader(console.log, console.error);

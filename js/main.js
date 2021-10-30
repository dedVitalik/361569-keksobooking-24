import './modules/markupgen.js';
import {makeFormInactive, makeFormActive, announcementsMap} from './modules/formandmap.js';

makeFormInactive();
announcementsMap.on('load', makeFormActive());

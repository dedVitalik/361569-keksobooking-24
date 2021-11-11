import {announcementsLoader, announcementSender} from './serverapi.js';
import {formatAnnouncements} from './formatter.js';

const announcementForm = document.querySelector('.ad-form');
const announcementFormParts = document.querySelectorAll('.ad-form fieldset');
const mapFiltersParts = document.querySelectorAll('.map__filters > *');
const mapFilters = document.querySelector('.map__filters');

const disabledToogleCollection = function (collection, trueOrFalse) {
  for (const elm of collection) {
    elm.disabled = trueOrFalse;
  }
};

const makeFormInActive = function () {
  announcementForm.classList.add('ad-form--disabled');
  disabledToogleCollection (announcementFormParts, true);
  mapFilters.classList.add('map__filters--disabled');
  disabledToogleCollection (mapFiltersParts, true);
};

const makeFormActive = function () {
  announcementForm.classList.remove('ad-form--disabled');
  disabledToogleCollection (announcementFormParts, false);
  mapFilters.classList.remove('map__filters--disabled');
  disabledToogleCollection (mapFiltersParts, false);
  console.log('Карта загружена');
};

// address (geo)
const adressInput = announcementForm.querySelector('input#address');
adressInput.value = '35.68210, 139.75895';

// announcement title validating
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const announcementTitleInput = announcementForm.querySelector('input#title');

announcementTitleInput.addEventListener('input', () => {
  const valueLength = announcementTitleInput.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    announcementTitleInput.setCustomValidity(`Ещё ${MIN_TITLE_LENGTH - valueLength} симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    announcementTitleInput.setCustomValidity(`Удалите лишние ${valueLength - MAX_TITLE_LENGTH} симв.`);
  } else {
    announcementTitleInput.setCustomValidity('');
  }
  announcementTitleInput.reportValidity();
});

// price per night validating
const MAX_PRICE = 1000000;
let minPrice = 1000;
const announcementPriceInput = announcementForm.querySelector('input#price');
announcementPriceInput.setAttribute('placeholder', `мин ${minPrice}`);

announcementPriceInput.addEventListener('input', () => {
  if (announcementPriceInput.value < minPrice) {
    announcementPriceInput.setCustomValidity(`Минимальная цена для данного типа жилья ${minPrice}`);
  } else if (announcementPriceInput.value > MAX_PRICE) {
    announcementPriceInput.setCustomValidity(`Вы ввели слишком большую цену, цена должна быть не больше ${MAX_PRICE}`);
  } else {
    announcementPriceInput.setCustomValidity('');
  }
  announcementPriceInput.reportValidity();
});

// type of lodging changing
const minPriceChanging = (newMinPrice) => {
  minPrice = newMinPrice;
  announcementPriceInput.setAttribute('placeholder', `мин ${newMinPrice}`);
};
const announcementLodgingInput = announcementForm.querySelector('select#type');

announcementLodgingInput.addEventListener('change', () => {
  switch (announcementLodgingInput.value) {
    case 'bungalow':
      minPriceChanging(0);
      break;
    case 'flat':
      minPriceChanging(1000);
      break;
    case 'hotel':
      minPriceChanging(3000);
      break;
    case 'house':
      minPriceChanging(5000);
      break;
    case 'palace':
      minPriceChanging(10000);
      break;
  }
  announcementLodgingInput.reportValidity();
});

// rooms and guests quantity synchronization
const announcementRoomsInput = announcementForm.querySelector('select#room_number');
const announcementGuestsInput = announcementForm.querySelector('select#capacity');
const announcementGuestsOptions = announcementGuestsInput.querySelectorAll('option');

const roomsAndGuestsChecker = () => {
  if (+announcementRoomsInput.value === 100) {
    for (let i = 0; i < announcementGuestsOptions.length; i++) {
      if (announcementGuestsOptions[i].value > 0) {
        announcementGuestsOptions[i].disabled = true;
        announcementGuestsOptions[i].selected = false;
      } else if (+announcementGuestsOptions[i].value === 0) {
        announcementGuestsOptions[i].selected = true;
      }
    }
  } else {
    for (let i = 0; i < announcementGuestsOptions.length; i++) {
      if (announcementRoomsInput.value < announcementGuestsOptions[i].value || +announcementGuestsOptions[i].value === 0) {
        announcementGuestsOptions[i].disabled = true;
        announcementGuestsOptions[i].selected = false;

      } else {announcementGuestsOptions[i].disabled = false;}
    }
  }
};
announcementRoomsInput.addEventListener ('change', roomsAndGuestsChecker);

// check-in and check-out time validation
const checkTimeFieldset = announcementForm.querySelector('fieldset.ad-form__element--time');
const checkInInput = announcementForm.querySelector('select#timein');
const checkOutInput = announcementForm.querySelector('select#timeout');

checkTimeFieldset.addEventListener ('change', (evt) => {
  if (evt.target === checkOutInput) {
    checkInInput.value = checkOutInput.value;
  } else {
    checkOutInput.value = checkInInput.value;
  }
});

// form submitting (function)

const setUserFormSubmit = (onSuccess) => {
  announcementForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const announceformData = new FormData(evt.target);

    announcementSender(
      () => onSuccess(),
      () => showAlert('Не удалось отправить форму. Попробуйте ещё раз'),
      announceformData,
    );
  });
};

// map creating
const announcementsMap = L.map('map-canvas').setView([35.68210, 139.75895], 14);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: 'pk.eyJ1IjoiZGVkdml0YWxpayIsImEiOiJja3Y5cWN3cmcyY2Z1MnVzM3drNXpnM3EzIn0.oKCmV8lT6MJSgrBh8oATfA',
}).addTo(announcementsMap);

// main icon creating
const mainIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainMarker = L.marker([35.68210, 139.75895], {icon: mainIcon, draggable: true}).addTo(announcementsMap);

mainMarker.on('move', (evt) => {
  const coords = evt.target.getLatLng();
  adressInput.value = `${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)}`;
});

// announcementS iconS creating

const announementsIconsCreator = (announcementsInArray) => {
  announcementsInArray.forEach ((announce) => {
    const icon = L.icon({
      iconUrl: './img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -38],
    });
    const coordsLatLng = announce.coords.split(', ');
    const marker = L.marker([Number(coordsLatLng[0]), Number(coordsLatLng[1])], {icon: icon}).addTo(announcementsMap);
    marker.bindPopup(announce.htmlCode);
  });
};

announcementsLoader().then((announcements) => {
  announementsIconsCreator(formatAnnouncements(announcements));
})
  .catch((err) => {
    // eslint-disable-next-line no-alert
    alert (`Что то пошло не так, ошибка ${err}`);
  });


export {makeFormInActive, makeFormActive, announcementsMap, setUserFormSubmit};

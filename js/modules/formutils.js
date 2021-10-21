const announcementForm = document.querySelector('.ad-form');
const announcementFormParts = document.querySelectorAll('.ad-form fieldset');
const mapFiltersParts = document.querySelectorAll('.map__filters > *');
const mapFilters = document.querySelector('.map__filters');

const disabledToogleCollection = function (collection, trueOrFalse) {
  for (const elm of collection) {
    elm.disabled = trueOrFalse;
  }
};

const makeFormInactive = function () {
  announcementForm.classList.add('ad-form--disabled');
  disabledToogleCollection (announcementFormParts, true);
  mapFilters.classList.add('map__filters--disabled');
  disabledToogleCollection (mapFiltersParts, true);
};

const makeFormActive = function () {
  announcementForm.classList.remove('ad-form--disabled');
  disabledToogleCollection (announcementFormParts, false);
  mapFilters.classList.remove('map__filters--disabled');
};

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

// rooms and guests quantity
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

export {makeFormInactive, makeFormActive};

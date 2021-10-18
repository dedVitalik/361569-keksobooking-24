
const announcementForm = document.querySelector('.ad-form');
const announcementFormParts = document.querySelectorAll('.ad-form fieldset');
const mapFiltersParts = document.querySelectorAll('.map__filters > *');
const mapFilters = document.querySelector('.map__filters');

const disabledToogle = function (collection, trueOrFalse) {
  for (const elm of collection) {
    elm.disabled = trueOrFalse;
  }
};

const makeFormInactive = function () {
  announcementForm.classList.add('ad-form--disabled');
  disabledToogle (announcementFormParts, true);
  mapFilters.classList.add('map__filters--disabled');
  disabledToogle (mapFiltersParts, true);
};

const makeFormActive = function () {
  announcementForm.classList.remove('ad-form--disabled');
  disabledToogle (announcementFormParts, false);
  mapFilters.classList.remove('map__filters--disabled');
};
export {makeFormInactive, makeFormActive};

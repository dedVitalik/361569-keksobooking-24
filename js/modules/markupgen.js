import { createAnnouncement } from './datagen.js';
import { constants } from './constants.js';

const announcementTemplate = document.querySelector('#card').content.querySelector('.popup');

const Announcements = document.createDocumentFragment();
const similarAnnouncements = Array.from(
  { length: constants.SIMILAR_ANNOUNCEMENT_COUNT },
  createAnnouncement,
);

// eslint-disable-next-line no-console
// console.log(similarAnnouncements);

similarAnnouncements.forEach((announcement) => {
  const announcementBlock = announcementTemplate.cloneNode (true);

  announcementBlock.querySelector('img.popup__avatar').src = announcement.author.avatar;
  announcementBlock.querySelector('h3.popup__title').textContent = announcement.offer.title;
  announcementBlock.querySelector('.popup__text.popup__text--address').textContent = announcement.offer.address;
  const currency = announcementBlock.querySelector('.popup__text--price').querySelector('span');
  announcementBlock.querySelector('.popup__text--price').textContent = `${announcement.offer.price  } ${currency.textContent}`;
  announcementBlock.querySelector('.popup__type').textContent = announcement.offer.type;
  announcementBlock.querySelector('.popup__text--capacity').textContent = `${announcement.offer.rooms} комнат для ${announcement.offer.guests} гостей`;
  announcementBlock.querySelector('.popup__text--time').textContent = `Заезд после ${announcement.offer.checkin}, выезд до ${announcement.offer.checkout}`;

  const allAnnouncementFeatures = announcementBlock.querySelectorAll('.popup__feature');
  const announcementOfferFeatures =  announcement.offer.features.map((feature) => `popup__feature--${feature}`);
  allAnnouncementFeatures.forEach((feature) => {
    if (!announcementOfferFeatures.includes(feature.classList[1])) {
      feature.remove();
    }
  });

  if (announcement.offer.description) {
    announcementBlock.querySelector('.popup__description').textContent = announcement.offer.description;
  } else {announcementBlock.querySelector('.popup__description').remove();}

  const photosTemplate = announcementBlock.querySelector('.popup__photo');
  announcementBlock.querySelector('.popup__photos').innerHTML = '';
  announcement.offer.photos.forEach((photoUrl) => {
    const newPhoto = photosTemplate.cloneNode(true);
    newPhoto.src = photoUrl;
    announcementBlock.querySelector('.popup__photos').appendChild(newPhoto);
  });
  Announcements.appendChild(announcementBlock);
});

// Вставка сгенерированных объявлений на место карты
// document.querySelector('#map-canvas').appendChild(Announcements);

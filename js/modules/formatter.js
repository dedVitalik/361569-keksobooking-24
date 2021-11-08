const formatAnnouncements = (similarAnnouncements) => {

  const announcementTemplate = document.querySelector('#card').content.querySelector('.popup');
  const announcementsInArray = [];

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
    if (announcement.offer.features) {
      const announcementOfferFeatures =  announcement.offer.features.map((feature) => `popup__feature--${feature}`);

      allAnnouncementFeatures.forEach((feature) => {
        if (!announcementOfferFeatures.includes(feature.classList[1])) {
          feature.remove();
        }
      });
    } else {
      allAnnouncementFeatures.forEach((feature) => {
        feature.remove();
      });
    }

    if (announcement.offer.description) {
      announcementBlock.querySelector('.popup__description').textContent = announcement.offer.description;
    } else {announcementBlock.querySelector('.popup__description').remove();}

    const photosTemplate = announcementBlock.querySelector('.popup__photo');

    announcementBlock.querySelector('.popup__photos').innerHTML = '';

    if (announcement.offer.photos) {
      announcement.offer.photos.forEach((photoUrl) => {
        const newPhoto = photosTemplate.cloneNode(true);
        newPhoto.src = photoUrl;
        announcementBlock.querySelector('.popup__photos').appendChild(newPhoto);
      });
    }

    const announcemetCodeAndCoords = {
      htmlCode: announcementBlock,
      coords: `${announcement.location.lat.toFixed(5)}, ${announcement.location.lng.toFixed(5)}`,
    };
    announcementsInArray.push(announcemetCodeAndCoords);
  });
  return announcementsInArray;
};

// const testing = announcementsLoader().then((announcements) => {
//   const res = formatAnnouncements(announcements);
//   // console.log (res);
// });

export {formatAnnouncements};

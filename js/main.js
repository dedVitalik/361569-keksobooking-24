/* eslint-disable no-console */
const getRandIntBetween = function (from, to) {
  const rand = from + Math.random() * (to + 1 - from);
  return Math.floor(rand);
};

console.log(getRandIntBetween(10, 50));

const getRandBetween = function (from, to, symbolsAfterComma) {
  if (from > to) {
    const intermediateValue = from;
    from = to;
    to = intermediateValue;
  }

  if (from >= 0 && to >= 0) {
    from *= Math.pow(10, symbolsAfterComma);
    to *= Math.pow(10, symbolsAfterComma);
    const rand = from + Math.random() * (to + 1 - from);
    return Math.floor(rand) / Math.pow(10, symbolsAfterComma);
  }
};

// eslint-disable-next-line no-console
console.log(getRandBetween(1.44, 1.22, 2));

// Announcements generator

const SIMILAR_ANNOUNCEMENT_COUNT = 10;

const avatarIndexes = Array.from(
  // eslint-disable-next-line id-length
  new Array(SIMILAR_ANNOUNCEMENT_COUNT),  (x, i) => i + 1);

avatarIndexes.forEach((avatarIndex, index, avatarsIndexes) => {
  avatarIndex = avatarIndex.toString();
  if (avatarIndex.length === 1) {
    avatarsIndexes[index] = `0${avatarIndex}`;
  } else {
    avatarsIndexes[index] = avatarIndex;
  }
});

const offerTypes = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const checkTimes = ['12:00', '13:00', '14:00'];

const getFewRandElemsFrom = (incomeArr) => {
  const resultArr = [];
  const numberOfElems = getRandIntBetween(1, incomeArr.length);
  // eslint-disable-next-line id-length
  for (let i = 0; i < numberOfElems; i++) {
    resultArr.push(incomeArr.splice(getRandIntBetween(0, incomeArr.length -1), 1).toString());
  }
  return resultArr;
};

const createAnnouncement = () => {
  const avatarIndex = avatarIndexes.splice(
    getRandIntBetween(0, avatarIndexes.length - 1),
    1,
  );

  const allFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  const offerFeatures = getFewRandElemsFrom(allFeatures);

  const allPhotos = [
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
  ];
  const offerPhotos = getFewRandElemsFrom(allPhotos);

  const locationLat = getRandBetween(35.65000, 35.70000, 5);
  const locationLng = getRandBetween(139.70000, 139.80000, 5);

  return {
    author: { avatar: `img/avatars/user${avatarIndex}.png` },

    location:{
      lat: locationLat,
      lng: locationLng,
    },

    offer: {
      title: 'Look at these annoucement',
      address: `${locationLat}, ${locationLng}`,
      price: getRandIntBetween(50, 500),
      type: offerTypes[getRandIntBetween(0, 4)],
      rooms: getRandIntBetween(1, 6),
      guests: getRandIntBetween(1, 30),
      checkin: checkTimes[getRandIntBetween(0, 2)],
      checkout: checkTimes[getRandIntBetween(0, 2)],
      features: offerFeatures,
      description: 'The best place ever',
      photos: offerPhotos,
    },
  };
};

const similarAnnouncements = Array.from({length: SIMILAR_ANNOUNCEMENT_COUNT}, createAnnouncement);
console.log(similarAnnouncements);

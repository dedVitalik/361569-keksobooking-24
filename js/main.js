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
    console.log(from);
    console.log(to);

    const rand = from + Math.random() * (to + 1 - from);
    console.log(rand);
    return Math.floor(rand) / Math.pow(10, symbolsAfterComma);
  }
};

// eslint-disable-next-line no-console
console.log(getRandBetween(1.44, 1.22, 2));

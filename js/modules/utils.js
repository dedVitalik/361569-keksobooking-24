const getRandIntBetween = function (from, to) {
  const rand = from + Math.random() * (to + 1 - from);
  return Math.floor(rand);
};

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

export {getRandIntBetween, getRandBetween};

const Ship = (Length = 0, marker = 'x') => {
  const shipMarker = marker;
  const shipLength = Length;
  let hits = 0;

  const hit = () => {
    hits += 1;
    return hits;
  };

  const isSunk = () => {
    if (shipLength === hits) {
      return true;
    }

    return false;
  };

  return {
    hit,
    isSunk,
    shipLength,
    shipMarker,
  };
};

export default Ship;

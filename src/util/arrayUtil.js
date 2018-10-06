export const transformArrayElement = (array, index, transform) => {
  return array.map((currentElement, currentIndex) => {
    if (currentIndex !== index) {
      return currentElement;
    } else {
      return transform(currentElement);
    }
  });
};

export const swapArrayElement = (array, index, updatedElement) => {
  return transformArrayElement(array, index, oldElement => updatedElement);
};

function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

export const makeIntArrayOfSize = size => {
  return [...range(1, size)];
};

const swapArrayElements = (array, x, y) => {
  if (array[x] === undefined || array[y] === undefined) {
    return array;
  }
  const a = x > y ? y : x;
  const b = x > y ? x : y;
  return [
    ...array.slice(0, a),
    array[b],
    ...array.slice(a+1, b),
    array[a],
    ...array.slice(b+1)
  ];
}

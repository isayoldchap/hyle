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
  return transformArrayElement(array, index, () => updatedElement);
};

function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

export const makeIntArrayOfSize = size => {
  return [...range(1, size)];
};
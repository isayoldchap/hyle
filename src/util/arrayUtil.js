
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
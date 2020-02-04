import {
    transformArrayElement,
    swapArrayElement
  } from "../../src/util/arrayUtil";
  import { assert } from "chai";
  
  describe("Array utilities", () => {
    it("should not mutate the original array", () => {
      const doubler = value => value * 2;
      const originalArray = [1, 2, 3, 4];
      const newArray = transformArrayElement(originalArray, 3, doubler);
      assert.equal(newArray[3], 8);
      assert.equal(originalArray[3], 4);
    });
  
    it("should make a new array with the specified element swapped out", () => {
      const originalArray = [1, 2, 3, 4];
      const newArray = swapArrayElement(originalArray, 3, 40);
      assert.equal(newArray[3], 40);
      assert.equal(originalArray[3], 4);
    });
  });
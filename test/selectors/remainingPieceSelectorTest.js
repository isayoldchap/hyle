import { assert } from "chai";
import { remainingCounts } from "../../src/selectors/gameSelector";

describe("A remainingPieceSelector", () => {
  const colors = ["red", "green", "blue", "blue", "red"];
  const colorCounts = remainingCounts(colors);

  it("should have counts for three colors", () => {
    assert.equal(colorCounts.length, 3);
  });

  it("should have a count of two for color red", () => {
    const redDetails = colorCounts.find(
      colorCount => colorCount.color === "red"
    );
    assert.equal(redDetails.count, 2);
  });
});

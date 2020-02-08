import { expect } from "chai";
import { createEngine } from "./engine";

describe("Engine stuff", () => {
    const engine = createEngine();

    engine.newGame();
    engine.playMove({x: 1, y: 2});
    engine.playMove({start: {x: 1, y: 2}, end: {x: 3, y: 2}});
    engine.playMove({x: 3, y: 3});
    engine.playMove({pass: true});
    engine.playMove({x: 3, y: 1});

    it("something", () => {
        expect(1).to.be.equal(1);
    });
});
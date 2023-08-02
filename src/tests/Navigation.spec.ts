import { Rover, Navigation } from "../index";

// Types
import { PlateauSize } from "../types";

describe("Mars Rover Navigation", () => {
  it("navigates rovers according to the instructions", () => {
    const plateauSize: PlateauSize = { x: 5, y: 5 };
    const rovers = [
      new Rover(1, 2, "N", plateauSize),
      new Rover(3, 3, "E", plateauSize),
    ];
    const instructions = ["LMLMLMLMM", "MMRMMRMRRM"];

    const navigation = new Navigation(plateauSize, rovers, instructions);
    const finalPositions = navigation.navigateRovers();

    expect(finalPositions[0].getX()).toEqual(1);
    expect(finalPositions[0].getY()).toEqual(3);
    expect(finalPositions[0].getOrientation()).toEqual("N");
    expect(finalPositions[1].getX()).toEqual(5);
    expect(finalPositions[1].getY()).toEqual(1);
    expect(finalPositions[1].getOrientation()).toEqual("E");
  });

  describe("Invalid instructions", () => {
    describe("Plateau size", () => {
      const expectedErrorMessage =
        "Invalid plateau size, x and y must be numbers greater than 0";

      it("should throw an error if the plateau size is zero", () => {
        expect(() => {
          new Navigation({ x: 0, y: 0 }, [], []);
        }).toThrowError(expectedErrorMessage);
      });

      it("should throw an error if the plateau size is negative", () => {
        expect(() => {
          new Navigation({ x: -1, y: -1 }, [], []);
        }).toThrowError(expectedErrorMessage);
      });

      it("should throw an error if the plateau size is not a number", () => {
        expect(() => {
          new Navigation({ x: NaN, y: NaN }, [], []);
        }).toThrowError(expectedErrorMessage);
      });
    });
  });

  // add more tests here for various scenarios and edge cases

  it.skip("should throw an error if the rover is already at the plateau boundary", () => {});
});

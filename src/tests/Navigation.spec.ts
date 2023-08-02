import { Rover, Navigation } from "../index";

// Types
import { PlateauSize } from "../types";

describe("Mars Rover Navigation", () => {
  const smallPlateauSize: PlateauSize = { x: 5, y: 5 };

  it("should create a new Navigation object", () => {
    const rovers = [new Rover(0, 0, "N", smallPlateauSize)];
    const instructions = ["M"];

    const navigation = new Navigation(smallPlateauSize, rovers, instructions);
    expect(navigation).toBeInstanceOf(Navigation);
  });

  it("navigates a rover according to some simple instructions", () => {
    const rovers = [new Rover(0, 0, "N", smallPlateauSize)];
    const instructions = ["M"];

    const navigation = new Navigation(smallPlateauSize, rovers, instructions);
    const finalPositions = navigation.navigateRovers();

    expect(finalPositions[0].getX()).toEqual(0);
    expect(finalPositions[0].getY()).toEqual(1);
    expect(finalPositions[0].getOrientation()).toEqual("N");
  });

  it("throws an error if no instruction is given", () => {
    const rovers = [new Rover(0, 0, "N", smallPlateauSize)];
    const instructions = [""];

    expect(() => {
      new Navigation(smallPlateauSize, rovers, instructions);
    }).toThrowError("Invalid instructions, must be a string of M, L, R"); // Updated error message
  });

  it("navigates two rovers according to instructions", () => {
    const rovers = [
      new Rover(1, 2, "N", smallPlateauSize),
      new Rover(3, 3, "E", smallPlateauSize),
    ];
    const instructions = ["LMLMLMLMM", "MMRMMRMRRM"];

    const navigation = new Navigation(smallPlateauSize, rovers, instructions);
    const finalPositions = navigation.navigateRovers();

    expect(finalPositions[0].getX()).toEqual(1);
    expect(finalPositions[0].getY()).toEqual(3);
    expect(finalPositions[0].getOrientation()).toEqual("N");

    expect(finalPositions[1].getX()).toEqual(5);
    expect(finalPositions[1].getY()).toEqual(1);
    expect(finalPositions[1].getOrientation()).toEqual("E");
  });

  it("navigates multiple rovers according to the instructions", () => {
    const rovers = [
      new Rover(1, 2, "N", smallPlateauSize),
      new Rover(3, 3, "E", smallPlateauSize),
      new Rover(0, 0, "N", smallPlateauSize),
    ];
    const instructions = ["LMLMLMLMM", "MMRMMRMRRM", "MM"];

    const navigation = new Navigation(smallPlateauSize, rovers, instructions);
    const finalPositions = navigation.navigateRovers();

    expect(finalPositions[0].getX()).toEqual(1);
    expect(finalPositions[0].getY()).toEqual(3);
    expect(finalPositions[0].getOrientation()).toEqual("N");
    expect(finalPositions[1].getX()).toEqual(5);
    expect(finalPositions[1].getY()).toEqual(1);
    expect(finalPositions[1].getOrientation()).toEqual("E");
    expect(finalPositions[2].getX()).toEqual(0);
    expect(finalPositions[2].getY()).toEqual(2);
    expect(finalPositions[2].getOrientation()).toEqual("N");
  });

  describe("Get position and orientation", () => {
    it("returns the final positions and orientations of the rovers as an array of strings", () => {
      const rovers = [
        new Rover(0, 0, "N", smallPlateauSize),
        new Rover(1, 1, "N", smallPlateauSize),
      ];
      const instructions = ["M", "R"];

      const navigation = new Navigation(smallPlateauSize, rovers, instructions);
      navigation.navigateRovers();
      const finalPositions = navigation.getPositionsAndOrientations();

      expect(finalPositions).toEqual(["0 1 N", "1 1 E"]);
    });
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

    // Below could potentially be removed, as also covered by Rover tests
    describe("Rover position", () => {
      it("should throw an error if x is negative", () => {
        expect(() => {
          new Navigation(
            { x: 5, y: 5 },
            [new Rover(-1, 0, "N", { x: 5, y: 5 })],
            []
          );
        }).toThrowError(
          "Invalid rover position, x and y must be numbers greater than zero and within the bounds of the plateau"
        );
      });
    });

    // Below could potentially be removed, as also covered by Rover tests
    describe("Rover orientation", () => {
      it("should throw an error if the orientation is invalid", () => {
        expect(() => {
          new Navigation(
            { x: 5, y: 5 },
            [new Rover(0, 0, "Z" as any, { x: 5, y: 5 })],
            []
          );
        }).toThrowError("Invalid rover orientation, must be one of N, E, S, W");
      });
    });

    describe("Instructions", () => {
      it("should throw an error if the instructions array length does not match the number of rovers", () => {
        expect(() => {
          new Navigation(
            { x: 5, y: 5 },
            [new Rover(0, 0, "N", { x: 5, y: 5 })],
            []
          );
        }).toThrowError(
          "Invalid instructions, there must be an equal number of rovers and instructions"
        );
      });

      it("should throw an error if the instructions are not a string", () => {
        expect(() => {
          new Navigation(
            { x: 5, y: 5 },
            [new Rover(0, 0, "N", { x: 5, y: 5 })],
            [1 as any]
          );
        }).toThrowError("Invalid instructions, must be a string");
      });
    });
  });
  // add more tests here for various scenarios and edge cases

  it.skip("should throw an error if the rover is already at the plateau boundary", () => {});
});

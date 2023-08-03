import { Rover, Navigation } from "../index";

// Types
import { PlateauSize } from "../types";

describe("Mars Rover Navigation", () => {
  const smallPlateauSize: PlateauSize = { x: 5, y: 5 };
  const rectanglePlateauSize: PlateauSize = { x: 5, y: 10 };

  // temporarily suppress console error messages
  beforeEach(() => {
    jest.spyOn(console, "error");
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore jest.spyOn adds this functionallity
    console.error.mockImplementation(() => null);
  });

  afterEach(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore jest.spyOn adds this functionallity
    console.error.mockRestore();
  });

  describe("Constructor", () => {
    it("should create a new Navigation object", () => {
      const rovers = [new Rover(0, 0, "N", smallPlateauSize)];
      const instructions = ["M"];

      const navigation = new Navigation(smallPlateauSize, rovers, instructions);
      expect(navigation).toBeInstanceOf(Navigation);
    });

    it("should throw an error if two rovers are constructed at the same position", () => {
      expect(() => {
        new Navigation(
          smallPlateauSize,
          [
            new Rover(1, 1, "N", smallPlateauSize),
            new Rover(1, 1, "N", smallPlateauSize),
          ],
          ["M", "M"],
        );
      }).toThrow(
        "Two or more rovers have been constructed at the same position: 1,1",
      );
    });
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

  it("navigates a rover forward on a large plateau", () => {
    const maxPlateauY = 100;
    const plateauSize: PlateauSize = { x: 100, y: maxPlateauY };
    const rovers = [new Rover(0, 0, "N", plateauSize)];

    const maxInstructionsLength = Math.floor(Math.random() * maxPlateauY);
    const instructions = Array.from(
      { length: maxInstructionsLength },
      () => "M",
    ).join("");

    const navigation = new Navigation(plateauSize, rovers, [instructions]);
    const finalPositions = navigation.navigateRovers();

    expect(finalPositions[0].getX()).toEqual(0);
    expect(finalPositions[0].getY()).toEqual(instructions.length);
    expect(finalPositions[0].getOrientation()).toEqual("N");
  });

  it("navigates a rover on a rectangle plateau", () => {
    const rovers = [new Rover(0, 0, "N", rectanglePlateauSize)];
    const instructions = ["MMRMR"];

    const navigation = new Navigation(
      rectanglePlateauSize,
      rovers,
      instructions,
    );
    const finalPositions = navigation.navigateRovers();

    expect(finalPositions[0].getX()).toEqual(1);
    expect(finalPositions[0].getY()).toEqual(2);
    expect(finalPositions[0].getOrientation()).toEqual("S");
  });

  it("navigates a rover according to complex instructions", () => {
    const plateauSize: PlateauSize = smallPlateauSize;
    const rover = new Rover(2, 2, "E", plateauSize);
    rover.navigate("MLMLMRMRM", new Set<string>(), 0);
    expect(rover.getX()).toBe(3);
    expect(rover.getY()).toBe(4);
    expect(rover.getOrientation()).toBe("E");
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

    it("Returns the same number of positions and orientations as there are rovers", () => {
      const rovers = [
        new Rover(0, 0, "N", smallPlateauSize),
        new Rover(1, 1, "N", smallPlateauSize),
      ];
      const instructions = ["M", "R"];

      const navigation = new Navigation(smallPlateauSize, rovers, instructions);
      navigation.navigateRovers();
      const finalPositions = navigation.getPositionsAndOrientations();

      expect(finalPositions.length).toBe(rovers.length);
    });
  });

  describe("Invalid input options", () => {
    describe("Plateau size", () => {
      const expectedErrorMessage =
        "Invalid plateau size, x and y must be numbers greater than 0";

      it("should throw an error if the plateau size is zero", () => {
        expect(() => {
          new Navigation({ x: 0, y: 0 }, [], []);
        }).toThrow(expectedErrorMessage);
      });

      it("should throw an error if the plateau size is negative", () => {
        expect(() => {
          new Navigation({ x: -1, y: -1 }, [], []);
        }).toThrow(expectedErrorMessage);
      });

      it("should throw an error if the plateau size is not a number", () => {
        expect(() => {
          new Navigation({ x: NaN, y: NaN }, [], []);
        }).toThrow(expectedErrorMessage);
      });
    });

    // Below could potentially be removed, as also covered by Rover tests
    describe("Rover initial position", () => {
      it("should throw an error if x is negative", () => {
        expect(() => {
          new Navigation(
            smallPlateauSize,
            [new Rover(-1, 0, "N", smallPlateauSize)],
            [],
          );
        }).toThrow(
          "Invalid rover position, x and y must be numbers greater than zero and within the bounds of the plateau",
        );
      });
    });

    // Below could potentially be removed, as also covered by Rover tests
    describe("Rover initial orientation", () => {
      it("should throw an error if the orientation is invalid", () => {
        expect(() => {
          new Navigation(
            smallPlateauSize,
            [new Rover(0, 0, "Z" as any, smallPlateauSize)],
            [],
          );
        }).toThrow("Invalid rover orientation, must be one of N, E, S, W");
      });
    });

    describe("Instructions", () => {
      it("throws an error if no instruction is given", () => {
        const rovers = [new Rover(0, 0, "N", smallPlateauSize)];
        const instructions = [""];

        expect(() => {
          new Navigation(smallPlateauSize, rovers, instructions);
        }).toThrow("Invalid instructions, must be a string of M, L, R");
      });

      it("should throw an error if the instructions array length does not match the number of rovers", () => {
        expect(() => {
          new Navigation(
            smallPlateauSize,
            [new Rover(0, 0, "N", smallPlateauSize)],
            [],
          );
        }).toThrow(
          "Invalid instructions, there must be an equal number of rovers and instructions",
        );
      });

      it("should throw an error if the instructions are not a string", () => {
        expect(() => {
          new Navigation(
            smallPlateauSize,
            [new Rover(0, 0, "N", smallPlateauSize)],
            [1 as any],
          );
        }).toThrow("Invalid instructions, must be a string");
      });

      it("should throw an error if the instructions are not M, L or R", () => {
        expect(() => {
          new Navigation(
            smallPlateauSize,
            [new Rover(0, 0, "N", smallPlateauSize)],
            ["Z"],
          );
        }).toThrow("Invalid instructions, must be a string of M, L, R");
      });

      it("should throw an error if the instructions are not a string comprised of M, L or R", () => {
        expect(() => {
          new Navigation(
            smallPlateauSize,
            [new Rover(0, 0, "N", smallPlateauSize)],
            ["MMMZ"],
          );
        }).toThrow("Invalid instructions, must be a string of M, L, R");
      });

      it("should log an error if the instructions would result in the rover going out of bounds", () => {
        const navigation = new Navigation(
          smallPlateauSize,
          [new Rover(0, 0, "N", smallPlateauSize)],
          ["MMMMMMMMMMMMMMMMMMMMMMMM"],
        );

        const consoleSpy = jest.spyOn(console, "error");

        navigation.navigateRovers();

        expect(consoleSpy).toHaveBeenCalledWith(
          "Invalid instructions, rover would go out of bounds. Keeping this rover stationary.",
        );
      });

      it("should not move the rover if the instructions would result in the rover going out of bounds", () => {
        const navigation = new Navigation(
          smallPlateauSize,
          [new Rover(0, 0, "N", smallPlateauSize)],
          ["MMMMMMMMMMMMMMMMMMMMMMMM"],
        );

        navigation.navigateRovers();

        const finalPositions = navigation.getPositionsAndOrientations();

        expect(finalPositions).toEqual(["0 0 N"]);
      });
    });
  });

  describe("Collision detection", () => {
    it("should log an error if a collision would occur", () => {
      const navigation = new Navigation(
        smallPlateauSize,
        [
          new Rover(0, 0, "N", smallPlateauSize),
          new Rover(0, 1, "N", smallPlateauSize),
        ],
        ["M", "M"],
      );

      const consoleSpy = jest.spyOn(console, "error");

      navigation.navigateRovers();

      expect(consoleSpy).toHaveBeenCalledWith(
        "Collision for Rover 0 would occur at 0 1. Keeping this rover stationary.",
      );
    });

    it("should not move the rover if it would cause a collision, but other rovers would move as normal", () => {
      const navigation = new Navigation(
        smallPlateauSize,
        [
          new Rover(0, 0, "N", smallPlateauSize),
          new Rover(0, 1, "N", smallPlateauSize),
          new Rover(0, 3, "N", smallPlateauSize),
        ],
        ["M", "M", "M"],
      );

      navigation.navigateRovers();

      const finalPositions = navigation.getPositionsAndOrientations();

      expect(finalPositions).toEqual(["0 0 N", "0 2 N", "0 4 N"]);
    });
  });
});

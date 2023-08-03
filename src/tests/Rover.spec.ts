import { Rover } from "../index";
import { Orientation } from "../types";

describe("Rover Class", () => {
  describe("Constructor", () => {
    const expectedPlateuSizeErrorMessage =
      "Invalid plateau size, x and y must be numbers greater than 0";
    const expectedRoverPositionErrorMessage =
      "Invalid rover position, x and y must be numbers greater than zero and within the bounds of the plateau";

    it("should create a new Rover object", () => {
      const rover = new Rover(0, 0, "N", { x: 5, y: 5 });
      expect(rover.getX()).toBe(0);
      expect(rover.getY()).toBe(0);
      expect(rover.getOrientation()).toBe("N");
    });

    it("should return the rover position and orientation as a string", () => {
      const rover = new Rover(0, 0, "N", { x: 5, y: 5 });
      expect(rover.getPositionAndOrientation()).toBe("0 0 N");
    });

    it("should throw an error if the plateau size is not an object", () => {
      expect(() => {
        new Rover(0, 0, "N", "{}" as any);
      }).toThrow(expectedPlateuSizeErrorMessage);
    });

    it("should throw an error if the plateau size is zero", () => {
      expect(() => {
        new Rover(0, 0, "N", { x: 0, y: 0 });
      }).toThrow(expectedPlateuSizeErrorMessage);
    });

    it("should throw an error if the plateau size is negative", () => {
      expect(() => {
        new Rover(0, 0, "N", { x: -1, y: -1 });
      }).toThrow(expectedPlateuSizeErrorMessage);
    });

    it("should throw an error if the plateau size is not a number", () => {
      expect(() => {
        new Rover(0, 0, "N", { x: NaN, y: NaN });
      }).toThrow(expectedPlateuSizeErrorMessage);
    });

    it("should throw an error if x is negative", () => {
      expect(() => {
        new Rover(-1, 0, "N", { x: 5, y: 5 });
      }).toThrow(expectedRoverPositionErrorMessage);
    });

    it("should throw an error if y is negative", () => {
      expect(() => {
        new Rover(0, -1, "N", { x: 5, y: 5 });
      }).toThrow(expectedRoverPositionErrorMessage);
    });

    it("should throw an error if x is not a number", () => {
      expect(() => {
        new Rover(NaN, 0, "N", { x: 5, y: 5 });
      }).toThrow(expectedRoverPositionErrorMessage);
    });

    it("should throw an error if y is not a number", () => {
      expect(() => {
        new Rover(0, NaN, "N", { x: 5, y: 5 });
      }).toThrow(expectedRoverPositionErrorMessage);
    });

    it("should throw and error if x is out of bounds of the plateau", () => {
      expect(() => {
        new Rover(6, 0, "N", { x: 5, y: 5 });
      }).toThrow(expectedRoverPositionErrorMessage);
    });

    it("should throw an error if the orientation is invalid", () => {
      expect(() => {
        new Rover(0, 0, "Z" as any, { x: 5, y: 5 });
      }).toThrow("Invalid rover orientation, must be one of N, E, S, W");
    });

    it("can be constructed with a valid orientation", () => {
      const orientations: Orientation[] = ["N", "E", "S", "W"];
      const randomOrientation =
        orientations[Math.floor(Math.random() * orientations.length)];

      expect(() => {
        new Rover(0, 0, randomOrientation, { x: 5, y: 5 });
      }).not.toThrow();
    });

    it("can be constructed with a valid plateau size up to 1000x1000", () => {
      const randomPlateauSize = {
        x: Math.floor(Math.random() * 1000),
        y: Math.floor(Math.random() * 1000),
      };

      expect(() => {
        new Rover(0, 0, "N", randomPlateauSize);
      }).not.toThrow();
    });
  });

  describe("navigate method", () => {
    const plateauSize = { x: 5, y: 5 };

    it("should turn the rover left correctly", () => {
      const rover = new Rover(0, 0, "N", plateauSize);
      rover.navigate("L", new Set([]), 0);
      expect(rover.getOrientation()).toBe("W");
    });

    it("should turn the rover right correctly", () => {
      const rover = new Rover(0, 0, "N", plateauSize);
      rover.navigate("R", new Set([]), 0);
      expect(rover.getOrientation()).toBe("E");
    });

    it("should move the rover forward correctly", () => {
      const rover = new Rover(0, 0, "N", plateauSize);
      rover.navigate("M", new Set([]), 0);
      expect(rover.getPositionAndOrientation()).toBe("0 1 N");
    });

    it("should handle a complex set of instructions correctly", () => {
      const rover = new Rover(1, 2, "E", plateauSize);
      rover.navigate("MLMLMRM", new Set(["1,2"]), 0);
      expect(rover.getPositionAndOrientation()).toBe("1 4 N");
    });

    it("should throw an error if the rover would collide with another rover", () => {
      const rover = new Rover(0, 0, "N", plateauSize);
      expect(() => {
        rover.navigate("M", new Set(["0,1"]), 0);
      }).toThrow(`Collision for Rover 0 would occur at 0 1. Keeping this rover stationary.`);
    });

    it("should throw an error if the rover would go out of bounds", () => {
      const rover = new Rover(5, 5, "N", plateauSize);
      expect(() => {
        rover.navigate("M", new Set([]), 0);
      }).toThrow("Invalid instructions, rover would go out of bounds. Keeping this rover stationary.");
    });
  });
});

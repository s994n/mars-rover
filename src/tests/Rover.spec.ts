import { Rover } from "../index";

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
  });

  describe("Movement methods", () => {
    it("should turn left", () => {
      const rover = new Rover(0, 0, "N", { x: 5, y: 5 });
      rover.turnLeft();
      expect(rover.getOrientation()).toBe("W");
    });

    it("should turn right", () => {
      const rover = new Rover(0, 0, "N", { x: 5, y: 5 });
      rover.turnRight();
      expect(rover.getOrientation()).toBe("E");
    });

    it("should handle multiple rotations", () => {
      const rover = new Rover(0, 0, "N", { x: 5, y: 5 });
      rover.turnRight();
      rover.turnRight();
      rover.turnRight();
      rover.turnRight(); // 360-degree rotation
      expect(rover.getOrientation()).toBe("N");
    });
  });
});

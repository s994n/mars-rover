import { Rover } from "../index";

// Types
import { PlateauSize } from "../types";

describe("Rover Class", () => {
  describe("Constructor", () => {
    const expectedPlateuSizeErrorMessage = "Invalid plateau size, x and y must be numbers greater than 0";
    const expectedRoverPositionErrorMessage = "Invalid rover position, x and y must be numbers greater than zero and within the bounds of the plateau";


    it("should create a new Rover object", () => {
      const rover = new Rover(0, 0, "N", { x: 5, y: 5 });
      expect(rover.getX()).toBe(0);
      expect(rover.getY()).toBe(0);
      expect(rover.getOrientation()).toBe("N");
    });

    it("should throw an error if the plateau size is zero", () => {
      expect(() => {
        new Rover(0, 0, "N", { x: 0, y: 0 });
      }).toThrowError(
        expectedPlateuSizeErrorMessage
      );
    });

    it("should throw an error if the plateau size is negative", () => {
      expect(() => {
        new Rover(0, 0, "N", { x: -1, y: -1 });
      }).toThrowError(
        expectedPlateuSizeErrorMessage
      );
    });

    it("should throw an error if the plateau size is not a number", () => {
      expect(() => {
        new Rover(0, 0, "N", { x: NaN, y: NaN });
      }).toThrowError(
        expectedPlateuSizeErrorMessage
      );
    });

    it("should throw an error if x is negative", () => {
      expect(() => {
        new Rover(-1, 0, "N", { x: 5, y: 5 });
      }).toThrowError(
        expectedRoverPositionErrorMessage
      );
    });

    it("should throw an error if y is negative", () => {
      expect(() => {
        new Rover(0, -1, "N", { x: 5, y: 5 });
      }).toThrowError(
        expectedRoverPositionErrorMessage
      );
    }
    );

    it("should throw an error if x is not a number", () => {
      expect(() => {
        new Rover(NaN, 0, "N", { x: 5, y: 5 });
      }).toThrowError(
        expectedRoverPositionErrorMessage
      );
    }
    );

    it("should throw an error if y is not a number", () => {
      expect(() => {
        new Rover(0, NaN, "N", { x: 5, y: 5 });
      }).toThrowError(
        expectedRoverPositionErrorMessage
      );
    }
    );

    it('should throw and error if x is out of bounds of the plateau', () => {
      expect(() => {
        new Rover(6, 0, "N", { x: 5, y: 5 });
      }).toThrowError(
        expectedRoverPositionErrorMessage
      );
    }
    );


    it("should throw an error if the orientation is invalid", () => {
      expect(() => {
        new Rover(0, 0, "Z" as any, { x: 5, y: 5 });
      }).toThrowError("Invalid rover orientation, must be one of N, E, S, W");
    }
    );
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

    it("should move forward", () => {
      const rover = new Rover(0, 0, "N", { x: 5, y: 5 });
      rover.moveForward();
      expect(rover.getX()).toBe(0);
      expect(rover.getY()).toBe(1);
    });

    it("should handle multiple rotations", () => {
      const rover = new Rover(0, 0, "N", { x: 5, y: 5 });
      rover.turnRight();
      rover.turnRight();
      rover.turnRight();
      rover.turnRight(); // 360-degree rotation
      expect(rover.getOrientation()).toBe("N");
    });

    it("should handle multiple movements", () => {
      const rover = new Rover(3, 2, "N", { x: 5, y: 5 });
      rover.moveForward();
      rover.moveForward();
      rover.moveForward();
      expect(rover.getX()).toBe(3);
      expect(rover.getY()).toBe(5);
    });

    it("should navigate complex instructions", () => {
      const plateauSize: PlateauSize = { x: 5, y: 5 };
      const rover = new Rover(2, 2, "E", plateauSize);
      rover.navigate("MLMLMRMRM"); // a series of movements and rotations
      expect(rover.getX()).toBe(3);
      expect(rover.getY()).toBe(4);
      expect(rover.getOrientation()).toBe("E");
    });
  });

  it("should not move beyond the plateau boundaries", () => {
    const plateauSize: PlateauSize = { x: 5, y: 5 };
    const rover = new Rover(5, 5, "N", plateauSize);
    rover.moveForward(); // trying to move north, but already at the northern boundary
    expect(rover.getX()).toBe(5);
    expect(rover.getY()).toBe(5);
  });
  // Additional tests for edge cases, such as reaching the plateau boundaries, could be added here
});

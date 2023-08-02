import { Rover, Navigation } from "../main";

// Types
import { PlateauSize } from "../types";

describe("Rover Class", () => {
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

  // Additional tests for edge cases, such as reaching the plateau boundaries, could be added here
});

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

  it("should not move beyond the plateau boundaries", () => {
    const plateauSize: PlateauSize = { x: 5, y: 5 };
    const rover = new Rover(5, 5, "N", plateauSize);
    rover.moveForward(); // trying to move north, but already at the northern boundary
    expect(rover.getX()).toBe(5);
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

  // add more tests here for various scenarios and edge cases
  it.skip("should throw an error if the instructions are invalid", () => {});
  it.skip("should throw an error if the rover is already at the plateau boundary", () => {});
});

// Types
import { PlateauSize, Orientation } from "../types";

// Constants
import {
  DIRECTIONS_LEFT_TURN,
  DIRECTIONS_RIGHT_TURN,
} from "../helpers/constants";

// Helpers
import {
  isValidPlateauSize,
  isValidRoverStartingPosition,
  isValidOrientation,
} from "../helpers/validations";

export class Rover {
  private x: number;
  private y: number;
  private orientation: Orientation;
  private plateauSize: PlateauSize;

  constructor(
    x: number,
    y: number,
    orientation: Orientation,
    plateauSize: PlateauSize,
  ) {
    if (isValidPlateauSize(plateauSize) === false) {
      throw new Error(
        "Invalid plateau size, x and y must be numbers greater than 0",
      );
    }

    if (isValidRoverStartingPosition(x, y, plateauSize) === false) {
      throw new Error(
        "Invalid rover position, x and y must be numbers greater than zero and within the bounds of the plateau",
      );
    }

    if (isValidOrientation(orientation) === false) {
      throw new Error("Invalid rover orientation, must be one of N, E, S, W");
    }

    this.x = x;
    this.y = y;
    this.orientation = orientation;
    this.plateauSize = plateauSize;
  }

  getX(): number {
    return this.x;
  }

  getY(): number {
    return this.y;
  }

  getOrientation(): Orientation {
    return this.orientation;
  }

  turnLeft(): void {
    const nextIndex = (DIRECTIONS_LEFT_TURN.indexOf(this.orientation) + 1) % 4;
    this.orientation = DIRECTIONS_LEFT_TURN[nextIndex];
  }

  turnRight(): void {
    const nextIndex = (DIRECTIONS_RIGHT_TURN.indexOf(this.orientation) + 1) % 4;
    this.orientation = DIRECTIONS_RIGHT_TURN[nextIndex];
  }

  navigate(instructions: string): void {
    let newX = this.x;
    let newY = this.y;

    for (const instruction of instructions) {
      switch (instruction) {
        case "L":
          this.turnLeft();
          break;
        case "R":
          this.turnRight();
          break;
        case "M":
          switch (this.orientation) {
            case "N":
              newY = newY + 1;
              break;
            case "E":
              newX = newX + 1;
              break;
            case "S":
              newY = newY - 1;
              break;
            case "W":
              newX = newX - 1;
              break;
          }

          // Check if the new position is out of bounds
          if (
            newX < 0 ||
            newX > this.plateauSize.x ||
            newY < 0 ||
            newY > this.plateauSize.y
          ) {
            throw new Error(
              "Invalid instructions, rover would go out of bounds. Keeping this rover stationary.",
            );
          }
          break;
      }
    }

    // Update the rover's position if not out of bounds
    this.x = newX;
    this.y = newY;
  }
}

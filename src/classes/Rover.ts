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

/**
 * Rover class represents a rover that can navigate through a plateau.
 *
 * @example
 * const plateauSize: PlateauSize = { x: 5, y: 5 };
 * const rover = new Rover(0, 0, "N", plateauSize);
 * rover.navigate("MLR", new Set(["1,2", "2,3"]), 0);
 * console.log(rover.getPositionAndOrientation()); // "0 1 N"
 */
export class Rover {
  private x: number;
  private y: number;
  private orientation: Orientation;
  private plateauSize: PlateauSize;

  /**
   * @param x Initial x coordinate of the rover.
   * @param y Initial y coordinate of the rover.
   * @param orientation Initial orientation of the rover ("N", "E", "S", "W").
   * @param plateauSize The size of the plateau the rover is navigating.
   * @throws {Error} If plateau size or rover's initial position is invalid.
   * @throws {Error} If rover's initial orientation is invalid.
   */
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

  /**
   * @returns {number} The current x coordinate of the rover.
   */
  getX(): number {
    return this.x;
  }

  /**
   * @returns {number} The current y coordinate of the rover.
   */
  getY(): number {
    return this.y;
  }

  /**
   * @returns {Orientation} The current orientation of the rover.
   */
  getOrientation(): Orientation {
    return this.orientation;
  }

  /**
   * @returns {string} The current position and orientation of the rover, formatted as "x y orientation".
   */
  getPositionAndOrientation(): string {
    return `${this.x} ${this.y} ${this.orientation}`;
  }

  /**
   * Turns the rover 90 degrees to the left.
   */
  private turnLeft(): void {
    const nextIndex = (DIRECTIONS_LEFT_TURN.indexOf(this.orientation) + 1) % 4;
    this.orientation = DIRECTIONS_LEFT_TURN[nextIndex];
  }

  /**
   * Turns the rover 90 degrees to the right.
   */
  turnRight(): void {
    const nextIndex = (DIRECTIONS_RIGHT_TURN.indexOf(this.orientation) + 1) % 4;
    this.orientation = DIRECTIONS_RIGHT_TURN[nextIndex];
  }

  private moveForward(
    newX: number,
    newY: number,
  ): { newX: number; newY: number } {
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

    return { newX, newY };
  }

  private checkBounds(newX: number, newY: number): void {
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
  }

  private checkCollision(
    occupiedPositions: Set<string>,
    newX: number,
    newY: number,
    roverIndex: number,
  ): void {
    if (occupiedPositions.has(`${newX},${newY}`)) {
      throw new Error(
        `Collision for Rover ${roverIndex} would occur at ${newX} ${newY}. Keeping this rover stationary.`,
      );
    }
  }

  /**
   * Navigates the rover based on the given instructions.
   * @param instructions A string of instructions, where "L" means turn left, "R" means turn right, and "M" means move forward.
   * @param occupiedPositions A set of coordinates that are already occupied by other rovers.
   * @param roverIndex The index of the rover, used for error messages.
   * @throws {Error} If the rover would collide with another rover or go out of bounds.
   */
  navigate(
    instructions: string,
    occupiedPositions: Set<string>,
    roverIndex: number,
  ): void {
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
          ({ newX, newY } = this.moveForward(newX, newY));
          this.checkCollision(occupiedPositions, newX, newY, roverIndex);
          this.checkBounds(newX, newY);
          break;
      }
    }

    // Update the rover's position if not out of bounds and not colliding
    this.x = newX;
    this.y = newY;
    occupiedPositions.add(`${this.x},${this.y}`);
  }
}

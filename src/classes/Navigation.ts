import { Rover } from "./Rover";

// Types
import { PlateauSize } from "../types";

// Helpers
import {
  isValidPlateauSize,
  isValidInstructions,
} from "../helpers/validations";

export class Navigation {
  private plateauSize: PlateauSize;
  private rovers: Rover[];
  private instructions: string[];

  /**
   * @param plateauSize Must have x and y greater than 0.
   * @param rovers An array of Rover objects.
   * @param instructions An array of strings containing navigation instructions.
   * @throws {Error} If plateau size is invalid (x and y must be greater than 0).
   * @throws {Error} If there are not an equal number of rovers and instructions.
   * @throws {Error} If instructions are invalid (must be a string of M, L, R).
   * @returns {Navigation} A new Navigation object.
   * @example
   * const plateauSize: PlateauSize = { x: 5, y: 5 };
   * const rovers = [new Rover(0, 0, "N", plateauSize)];
   * const instructions = ["M"];
   * const navigation = new Navigation(plateauSize, rovers, instructions);
   * navigation.navigateRovers();
   * navigation.getPositionsAndOrientations();
   * // => ["0 1 N"]
   */
  constructor(
    plateauSize: PlateauSize,
    rovers: Rover[],
    instructions: string[],
  ) {
    if (isValidPlateauSize(plateauSize) === false) {
      throw new Error(
        "Invalid plateau size, x and y must be numbers greater than 0",
      );
    }

    if (rovers.length !== instructions.length) {
      throw new Error(
        "Invalid instructions, there must be an equal number of rovers and instructions",
      );
    }

    if (isValidInstructions(instructions) === false) {
      throw new Error("Invalid instructions, must be a string of M, L, R");
    }

    this.plateauSize = plateauSize;
    this.rovers = rovers;
    this.instructions = instructions;
  }

  private navigateRover(rover: Rover, instructions: string): void {
    try {
      rover.navigate(instructions);
    } catch (error) {
      // leave the rover stationary and log the error
      console.error((error as Error).message);
    }
  }

  navigateRovers(): Rover[] {
    this.rovers.forEach((rover, index) => {
      this.navigateRover(rover, this.instructions[index]);
    });
    return this.rovers;
  }

  getPositionsAndOrientations(): string[] {
    return this.rovers.map((rover) => {
      return rover.getPositionAndOrientation();
    });
  }
}

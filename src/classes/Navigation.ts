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

  navigateRovers(): Rover[] {
    return this.rovers.map((rover, index) => {
      rover.navigate(this.instructions[index]);
      return rover;
    });
  }

  getPositionsAndOrientations(): string[] {
    return this.rovers.map((rover) => {
      return `${rover.getX()} ${rover.getY()} ${rover.getOrientation()}`;
    });
  }
}

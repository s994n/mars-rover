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
    this.validatePlateauSize(plateauSize);
    this.validateInstructionsCount(rovers, instructions);
    this.validateInstructionStrings(instructions);
    this.checkForDuplicatePositions(rovers);

    this.plateauSize = plateauSize;
    this.rovers = rovers;
    this.instructions = instructions;
  }

  private validatePlateauSize(plateauSize: PlateauSize): void {
    if (isValidPlateauSize(plateauSize) === false) {
      throw new Error(
        "Invalid plateau size, x and y must be numbers greater than 0",
      );
    }
  }

  private validateInstructionsCount(
    rovers: Rover[],
    instructions: string[],
  ): void {
    if (rovers.length !== instructions.length) {
      throw new Error(
        "Invalid instructions, there must be an equal number of rovers and instructions",
      );
    }
  }

  private validateInstructionStrings(instructions: string[]): void {
    if (isValidInstructions(instructions) === false) {
      throw new Error("Invalid instructions, must be a string of M, L, R");
    }
  }

  /**
   * Checks for duplicate rover positions.
   * @param rovers Array of Rover objects.
   * @throws {Error} If two or more rovers have the same initial position.
   */
  private checkForDuplicatePositions(rovers: Rover[]): void {
    const positions = new Set<string>();
    rovers.forEach((rover) => {
      const position = `${rover.getX()},${rover.getY()}`;
      if (positions.has(position)) {
        throw new Error(
          `Two or more rovers have been constructed at the same position: ${position}`,
        );
      }
      positions.add(position);
    });
  }

  /**
   * Navigates a single rover based on its instructions.
   * @param rover The Rover object to navigate.
   * @param instructions Navigation instructions for the rover.
   * @param occupiedPositions Set of coordinates currently occupied by rovers.
   * @param index The index of the rover in the rovers array.
   */
  private navigateRover(
    rover: Rover,
    instructions: string,
    occupiedPositions: Set<string>,
    index: number,
  ): void {
    const initialPosition = `${rover.getX()},${rover.getY()}`;
    occupiedPositions.delete(initialPosition); // Remove the initial position
    try {
      rover.navigate(instructions, occupiedPositions, index);
    } catch (error) {
      // leave the rover stationary and log the error
      console.error((error as Error).message);
      occupiedPositions.add(initialPosition); // Add the initial position back if there was an error
      return;
    }
    const newPosition = `${rover.getX()},${rover.getY()}`;
    occupiedPositions.add(newPosition); // Add the new position
  }

  /**
   * Navigates all rovers based on their instructions.
   * @returns {Rover[]} Array of Rover objects after navigation.
   */
  navigateRovers(): Rover[] {
    const occupiedPositions = new Set<string>();
    this.rovers.forEach((rover) =>
      occupiedPositions.add(`${rover.getX()},${rover.getY()}`),
    );
    this.rovers.forEach((rover, index) => {
      this.navigateRover(
        rover,
        this.instructions[index],
        occupiedPositions,
        index,
      );
    });
    return this.rovers;
  }

  /**
   * Gets the positions and orientations of all rovers.
   * @returns {string[]} Array of strings representing the position and orientation of each rover.
   */
  getPositionsAndOrientations(): string[] {
    return this.rovers.map((rover) => {
      return rover.getPositionAndOrientation();
    });
  }
}

import { Rover } from './Rover';

// Types
import { PlateauSize } from '../types';

// Helpers
import { isValidPlateauSize } from '../helpers/validations';

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
  constructor(plateauSize: PlateauSize, rovers: Rover[], instructions: string[]) {
    if (isValidPlateauSize(plateauSize) === false) {
      throw new Error('Invalid plateau size, x and y must be numbers greater than 0');
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
}

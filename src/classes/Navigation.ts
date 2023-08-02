import { Rover } from './Rover';

// Types
import { PlateauSize } from '../types';

export class Navigation {
  private plateauSize: PlateauSize;
  private rovers: Rover[];
  private instructions: string[];

  constructor(plateauSize: PlateauSize, rovers: Rover[], instructions: string[]) {
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

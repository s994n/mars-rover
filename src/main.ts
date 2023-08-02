// // Types
import { PlateauSize } from './types';

export class Rover {
  constructor(public x: number, public y: number, public orientation: 'N' | 'E' | 'S' | 'W', private plateauSize: PlateauSize) {}

  turnLeft(): void {
    const directions: this['orientation'][] = ['N', 'W', 'S', 'E'];
    const nextIndex = (directions.indexOf(this.orientation) + 1) % 4;
    this.orientation = directions[nextIndex];
  }

  turnRight(): void {
    const directions: this['orientation'][] = ['N', 'E', 'S', 'W'];
    const nextIndex = (directions.indexOf(this.orientation) + 1) % 4;
    this.orientation = directions[nextIndex];
  }

  moveForward(): void {
    switch (this.orientation) {
      case 'N':
        this.y = Math.min(this.y + 1, this.plateauSize.y);
        break;
      case 'E':
        this.x = Math.min(this.x + 1, this.plateauSize.x);
        break;
      case 'S':
        this.y = Math.max(this.y - 1, 0);
        break;
      case 'W':
        this.x = Math.max(this.x - 1, 0);
        break;
    }
  }

  navigate(instructions: string): void {
    for (const instruction of instructions) {
      switch (instruction) {
        case 'L':
          this.turnLeft();
          break;
        case 'R':
          this.turnRight();
          break;
        case 'M':
          this.moveForward();
          break;
      }
    }
  }
}

export class Navigation {
  constructor(private plateauSize: PlateauSize, private rovers: Rover[], private instructions: string[]) {}

  navigateRovers(): Rover[] {
    return this.rovers.map((rover, index) => {
      rover.navigate(this.instructions[index]);
      return rover;
    });
  }
}

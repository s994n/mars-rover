// Types
import { PlateauSize, Orientation } from './types';

// Constants for directions
const DIRECTIONS_LEFT_TURN: Orientation[] = ['N', 'W', 'S', 'E'];
const DIRECTIONS_RIGHT_TURN: Orientation[] = ['N', 'E', 'S', 'W'];

export class Rover {
  private x: number;
  private y: number;
  private orientation: Orientation;
  private plateauSize: PlateauSize;

  constructor(x: number, y: number, orientation: Orientation, plateauSize: PlateauSize) {
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

  moveForward(): void {
    let newX = this.x;
    let newY = this.y;

    switch (this.orientation) {
      case 'N':
        newY = Math.min(this.y + 1, this.plateauSize.y);
        break;
      case 'E':
        newX = Math.min(this.x + 1, this.plateauSize.x);
        break;
      case 'S':
        newY = Math.max(this.y - 1, 0);
        break;
      case 'W':
        newX = Math.max(this.x - 1, 0);
        break;
    }

    if (newX >= 0 && newX <= this.plateauSize.x && newY >= 0 && newY <= this.plateauSize.y) {
      this.x = newX;
      this.y = newY;
    } else {
      // Optionally log a warning or handle the error more gracefully
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

export type PlateauSize = {
  x: number;
  y: number;
};

export type Position = {
  x: number;
  y: number;
  orientation: 'N' | 'E' | 'S' | 'W';
};

export type Rover = {
  position: Position;
  instructions: string;
};
export type PlateauSize = {
  x: number;
  y: number;
};

export type Orientation = 'N' | 'E' | 'S' | 'W';

export type Position = {
  x: number;
  y: number;
  orientation: Orientation;
};

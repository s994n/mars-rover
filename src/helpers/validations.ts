import { PlateauSize } from "../types";

export const isValidPlateauSize = (plateauSize: PlateauSize): boolean => {
  return plateauSize.x > 0 && plateauSize.y > 0 && isFinite(plateauSize.x) && isFinite(plateauSize.y);
};

export const isValidRoverStartingPosition = (x: number, y: number, plateauSize: PlateauSize): boolean => {
  return x >= 0 && y >= 0 && x <= plateauSize.x && y <= plateauSize.y && isFinite(x) && isFinite(y);
}

export const isValidOrientation = (orientation: string): boolean => {
  return ['N', 'E', 'S', 'W'].includes(orientation);
}
import { PlateauSize } from "../types";

export const isValidPlateauSize = (plateauSize: PlateauSize): boolean => {
  return (
    plateauSize.x > 0 &&
    plateauSize.y > 0 &&
    isFinite(plateauSize.x) &&
    isFinite(plateauSize.y)
  );
};

export const isValidRoverStartingPosition = (
  x: number,
  y: number,
  plateauSize: PlateauSize,
): boolean => {
  return (
    x >= 0 &&
    y >= 0 &&
    x <= plateauSize.x &&
    y <= plateauSize.y &&
    isFinite(x) &&
    isFinite(y)
  );
};

export const isValidOrientation = (orientation: string): boolean => {
  return ["N", "E", "S", "W"].includes(orientation);
};

export const isValidInstructions = (instructions: string[]): boolean => {
  return instructions.every((instruction) => {
    if (typeof instruction !== "string") return false;

    if (instruction === "") return false;

    return instruction.split("").every((character) => {
      return ["M", "L", "R"].includes(character);
    });
  });
};

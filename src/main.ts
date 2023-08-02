import readline from "readline";
import { Navigation } from "./classes/Navigation";
import { Rover } from "./classes/Rover";
import { PlateauSize, Orientation } from "./types";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function main() {
  rl.question(
    "Input plateau size (x y, separated by a space): ",
    (plateauInput) => {
      const [plateauX, plateauY] = plateauInput.split(" ").map(Number);
      const plateauSize: PlateauSize = { x: plateauX, y: plateauY };
      const rovers: Rover[] = [];
      const instructions: string[] = [];

      function promptRoverPosition() {
        rl.question(
          "Input new Rover position (default (0 0 N); or input 'No' for no new rovers): ",
          (roverPosition) => {
            if (roverPosition.toLowerCase() === "no") {
              if (rovers.length === 0) {
                console.log(
                  "At least one rover must be provided. Please input the rover position.",
                );
                promptRoverPosition(); // Prompt for the first Rover again
                return;
              }

              rl.close();
              const navigation = new Navigation(
                plateauSize,
                rovers,
                instructions,
              );
              navigation.navigateRovers();
              const finalPositions = navigation.getPositionsAndOrientations();
              console.log(finalPositions.join("\n"));
              return;
            }

            const [x, y, orientation] = roverPosition
              ? roverPosition.split(" ")
              : ["0", "0", "N"];
            rovers.push(
              new Rover(
                Number(x),
                Number(y),
                orientation as Orientation,
                plateauSize,
              ),
            );

            rl.question(
              "Input instructions for this Rover: ",
              (instruction) => {
                instructions.push(instruction);
                promptRoverPosition(); // Prompt for the next Rover
              },
            );
          },
        );
      }

      promptRoverPosition(); // Start with the first Rover
    },
  );
}

main();

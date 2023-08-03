# Mars Rover Technical Challenge

## Description

This repository provides a solution to the Mars Rover technical challenge (see [Original Brief](#original-brief)). It simulates the movement of rovers across a plateau on Mars. Users can define the plateau size, rover positions, and navigation instructions. The solution will simulate the rover(s) following these instructions and print the final positions.

The `Navigation` class controls the movement of the rovers across the plateau, ensuring they follow the provided instructions. The `Rover` class defines individual rover objects with methods to navigate them.

## Technologies used
* TypeScript: The entire codebase is written in TypeScript, providing strong typing and modern JavaScript features.

* Node.js: Utilized as the runtime for executing the server-side TypeScript code.

* Testing: Jest; A widely-used JavaScript testing framework, enabling thorough unit testing of the codebase.

* Linting and formatting: ESLint and Prettier.

* Dependency Management: Yarn.


## Setup Instructions

1. **Clone the repository**

2. **Navigate to the project directory:**
   ```
   cd mars-rover
   ```

3. **Install dependencies using Yarn:**
   ```
   yarn install
   ```

## How to Run Tests

The project includes unit tests to ensure code quality. You can run the tests using the following command:

```
yarn test
```

## How to Run the Code for manual testing

This codebase includes a `main.ts` file to allow manual testing using Node's readline interface. You can manually input plateau size, rover positions, and navigation instructions.

To manually test the code, you can compile and run the code via either `yarn compileAndRun` (build the dist and run it) or `yarn start`

## Assumptions and Constraints
The following assumptions and constraints apply to the Mars Rover implementation as described in the codebase:
* A collision is considered to be two or more rovers occupying the same grid position.
* Two or more rovers cannot be constructed at the same initial position. An error will be thrown if this occurs.
* If an instruction to a rover means that a collision with another rover would occur, an error is thrown, and the rover that would cause the collision remains stationary.
* If a rover is instructed over the boundary of the plateau, an error is thrown, and that rover remains stationary, but other rovers continue to move.

### Example Input

```
Input plateau size (x y, separated by a space): 5 5
Input new Rover position as x y orientation, separated by spaces; e.g. 0 1 N. (default (0 0 N); or input 'No' for no new rovers): 1 2 N
Input instructions for this Rover: MM
Input new Rover position as x y orientation, separated by spaces; e.g. 0 1 N. (default (0 0 N); or input 'No' for no new rovers): No
// 1 4 N
```


## Linting

To check for linting issues, you can use:

```
yarn lint
```

And to automatically fix linting issues:

```
yarn lint:fix
```

## Dependencies

The project has the following dependencies:

- `readline`: for CLI interaction.
- Various development dependencies for TypeScript, testing with Jest, and linting.

## Ideas for future work and enhancements
The current implementation should fulfil the [challenge brief](#original-brief), but there are several areas where additional features and improvements could be introduced:

Individual Rover Control: At present, the rovers are navigated all at once based on their position in the array. It might be beneficial to add functionality to control individual rovers based on their index or some other unique identifier. This would allow for more precise management and navigation of the rovers.

Real-time Navigation Updates: The current navigation method processes all instructions at once. Introducing real-time updates would allow for more dynamic control, where changes to one rover's instructions could be made on the fly, taking into account the current positions of other rovers.

Path Planning and Obstacle Avoidance: The existing code is equipped to detect collisions and boundaries but does not provide alternatives if a collision or boundary is detected. Integrating a path planning algorithm that can find alternative routes around obstacles or other rovers could make navigation more robust and efficient.

Simulation and Visualization: Building a visual simulation of the plateau and the rovers' movements could be a valuable tool for testing and demonstration purposes. A graphical representation would make it easier to understand the rovers' behaviors and identify any issues.

Advanced Commands and Behaviors: The current command set (L, R, M) is limited. Extending the command language to include more complex behaviors (e.g., dealing in angles such as 45 degrees, reverse, patrol between points, follow another rover) could make the system more versatile and applicable to more complex scenarios.

Robust Error Handling and Recovery: While the code includes error handling for some specific scenarios (e.g., collisions, invalid starting positions), building a more comprehensive error recovery system could allow the navigation to continue in the face of unexpected issues.

Integration with Physical Robots: While the code currently operates in a simulated environment, adapting the implementation to control actual physical rovers could be an exciting direction for real-world applications.

Scalability and Performance Optimization: Depending on the number of rovers and the size of the plateau, performance optimization may be necessary. This could include algorithmic enhancements, parallel processing, or other techniques to handle large-scale deployments.

## Original brief
Mars Rover technical Challenge
The problem below requires some kind of input. You are free to implement any mechanism for
feeding input into your solution (for example, using hard coded data within a unit test). You
should provide sufficient evidence that your solution is complete by, as a minimum, indicating
that it works correctly against the supplied test data.

We highly recommend using a unit testing framework. Even if you have not used it before, it is
simple to learn and incredibly useful.

The code you write should be of production quality, and most importantly, it should be code you
are proud of.

MARS ROVERS

A squad of robotic rovers are to be landed by NASA on a plateau on Mars.
This plateau, which is curiously rectangular, must be navigated by the rovers so that their on
board cameras can get a complete view of the surrounding terrain to send back to Earth.
A rover's position is represented by a combination of an x and y co-ordinates and a letter
representing one of the four cardinal compass points. The plateau is divided up into a grid to
simplify navigation. An example position might be 0, 0, N, which means the rover is in the bottom
left corner and facing North.
In order to control a rover, NASA sends a simple string of letters. The possible letters are 'L', 'R'
and 'M'. 'L' and 'R' makes the rover spin 90 degrees left or right respectively, without moving
from its current spot.
'M' means move forward one grid point, and maintain the same heading.
Assume that the square directly North from (x, y) is (x, y+1).
Input:
The first line of input is the upper-right coordinates of the plateau, the lower-left coordinates are
assumed to be 0,0.
The rest of the input is information pertaining to the rovers that have been deployed. Each rover
has two lines of input. The first line gives the rover's position, and the second line is a series of
instructions telling the rover how to explore the plateau.
The position is made up of two integers and a letter separated by spaces, corresponding to the x
and y co-ordinates and the rover's orientation.
Each rover will be finished sequentially, which means that the second rover won't start to move
until the first one has finished moving.
Output:
The output for each rover should be its final co-ordinates and heading.

Test Input:

5 5

1 2 N

LMLMLMLMM

3 3 E

MMRMMRMRRM

Expected Output:

1 3 N

5 1 E

## Extra Notes

Feel free to reach out if you have any questions or need further assistance with the codebase!

import { Inject, Injectable } from '@angular/core';

/**
 * @class Position
 *
 * @param {number} x A number that would coordinate to the horizontal location of the player
 * @param {number} y A number that would coordinate to the vertical location of the player
 */
@Injectable()
export class Position {
  constructor(
    @Inject('x') public x: number,
    @Inject('y') public y: number,
  ) {
    if (typeof this.x !== 'number') {
      this.x = 0;
    }
    if (typeof this.y !== 'number') {
      this.y = 0;
    }
  }

  /**
   * @desctiption To concat two Positions together into a new Position to be returned
   *
   * @function combinedPositions
   * @param {Position} position A new position to concat with 'this' Position
   * @returns {Position}
   */
  public combinedPositions(position: Position): Position {
    const xPos = position.x + this.x;
    const yPos = position.y + this.y;
    const newPosition = new Position(xPos ?? 0, yPos ?? 0);

    return newPosition;
  }

  /**
   * @description To move 'this' Position to a new location given the user input
   *
   * @function movePositions
   * @param {Position} position A new position to concat to 'this' Position
   * @void
   */
  public movePositions(position: Position): void {
    this.x = (position?.x || 0) + this.x;
    this.y = (position?.y || 0) + this.y;
  }

  /**
   * @description To transform a position into a [x, y] format
   *
   * @function getNumberedCoordinates
   * @return {numbers[]}
   */
  public getNumberedCoordinates(): number[] {
    return [this.x, this.y];
  }
}

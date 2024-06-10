import { Inject, Injectable } from '@angular/core';
import { walls } from './config/position.config';

/**
 * @class Position
 *
 * @param {number} x A number that would coordinate to the horizontal location of the player
 * @param {number} y A number that would coordinate to the vertical location of the player
 * @param {boolean} withGridCells Indicates if the frame size offset should be added
 */
@Injectable()
export class Position {
  constructor(
    @Inject('x') public x: number,
    @Inject('y') public y: number,
    @Inject('withGridCells') public withGridCells: boolean = false,
  ) {
    if (typeof this.x !== 'number') {
      this.x = 0;
    }
    if (typeof this.y !== 'number') {
      this.y = 0;
    }
    if (withGridCells) {
      this.x = this.gridCells(this.x);
      this.y = this.gridCells(this.y);
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
    return new Position(
      (position?.x || 0) + this.x,
      (position?.y || 0) + this.y,
    );
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
   * @description To return any grid cell multiplied by 16 since our image is 16x16
   *
   * @function gridCells
   * @param {number} value A number that will be manipulated and returned
   * @returns {number}
   */
  public gridCells(value: number): number {
    return (value || 0) * 16;
  }

  /**
   * @description To check if the coordinates provided are safe given the walls set
   *
   * @function isSpaceFree
   * @param {Set<string>} walls A set of coordinates the hero cannot proceed to
   * @param {number} x coordinate
   * @param {number} y coordinate
   * @returns {boolean}
   */
  public isSpaceFree(): boolean {
    return !walls.has(`${this.x},${this.y}`);
  }
}

import { Injectable } from '@angular/core';

@Injectable()
export class Grid {
  constructor() {}

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
  public isSpaceFree(walls: Set<string>, x: number, y: number): boolean {
    return !walls.has(`${x},${y}`);
  }
}

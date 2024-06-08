import { Inject, Injectable } from '@angular/core';

/**
 * @class Position
 */
@Injectable()
export class Position {
  constructor(
    @Inject('x') public x: number,
    @Inject('y') public y: number,
  ) {}
}

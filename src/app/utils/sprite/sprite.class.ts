import { Inject, Injectable } from '@angular/core';
import { SpriteContext } from './interface/sprite.interface';
import { spriteContext } from './config/sprite.config';
import { Position } from '../position';

@Injectable()
export class Sprite {
  public context: SpriteContext = spriteContext;
  protected frameMap: Map<number, Position> = new Map();

  constructor(@Inject('context') public _context: SpriteContext) {
    Object.keys(_context).forEach((property) => {
      const value = (this._context as any)[property];

      if (value)
        this.context = {
          ...this.context,
          [property]: value,
        };
    });

    this.buildFrameMap();
  }

  /**
   * @description To loop through the vertical and horizontal frames of the image (spritesheet) provided
   *                to build out an active Map of the different sprite locations
   * @function buildFrameMap
   * @void
   */
  private buildFrameMap(): void {
    let frameCount = 0;

    for (let v = 0; v < this.context.verticalFrames; v++) {
      for (let h = 0; h < this.context.horizontalFrames; h++) {
        const yPos = this.context.frameSize.y * v;
        const xPos = this.context.frameSize.x * h;

        this.frameMap.set(frameCount, new Position(xPos, yPos));
        frameCount += 1;
      }
    }
  }

  public renderSprite(
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
  ): void {
    if (!this.context.asset.isLoaded) return;

    const frame = this.frameMap.get(this.context.frame);
    const frameSizeX = this.context.frameSize.x;
    const frameSizeY = this.context.frameSize.y;
    let frameLocationY = 0;
    let frameLocationX = 0;

    if (frame) {
      frameLocationX = frame.x;
      frameLocationY = frame.y;
    }

    if (context) {
      context.drawImage(
        this.context.asset.image as unknown as CanvasImageSource, // Image
        frameLocationX, // x coordinate
        frameLocationY, // y coodinate
        frameSizeX, // how wide the size of the asset we're trying to crop is
        frameSizeY, // how long the size of the asset we're trying to crop is
        x, // location on the canvas for the x coordinate to be placed
        y, // location on the canvas for the y coordinate to be placed
        frameSizeX * this.context.scale, // the scale of the image on the canvas for x
        frameSizeY * this.context.scale, // the scale of the image on the canvas for y
      );
    }
  }
}

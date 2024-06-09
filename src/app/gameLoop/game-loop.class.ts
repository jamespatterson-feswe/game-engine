import { DestroyRef, Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { timer } from 'rxjs';
import { Asset, Position, Resources, Sprite, SpriteContext } from '../utils';
import { UserInput } from '../utils/userInput/user-input.class';

@Injectable()
export class GameLoop {
  private destroyRef = inject(DestroyRef);
  private fps = 1000 / 60;
  private hero!: Sprite;
  private heroPosition: Position = new Position(16 * 6, 16 * 5);
  private isGameStarted = false;
  private isRunning = false;
  private resources = new Resources();
  private userInput = new UserInput();

  constructor() {
    this.hero = new Sprite({
      asset: this.resources.availableAssets['hero'] as unknown as Asset,
      frameSize: new Position(32, 32),
      horizontalFrames: 3,
      verticalFrames: 8,
      frame: 1,
    } as unknown as SpriteContext);

    this.userInput.movementPostition$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => this.heroPosition.movePositions(value));

    timer(this.fps, this.fps)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        if (this.isGameStarted && this.isRunning) {
          this.renderStationary();
        }
      });
  }

  public run(): void {
    this.isGameStarted = true;
    this.isRunning = true;
  }

  public pause(): void {
    this.isRunning = false;
  }

  private renderStationary(): void {
    const stationary = [
      this.resources.availableAssets['sky'],
      this.resources.availableAssets['ground'],
    ];

    const canvas: HTMLCanvasElement | null =
      document.querySelector('#game-canvas');
    const context = canvas?.getContext('2d');

    stationary.forEach((asset) => {
      const sprite = new Sprite({
        asset,
        frameSize: new Position(320, 180),
      } as unknown as SpriteContext);

      sprite.renderSprite(context as unknown as CanvasRenderingContext2D, 0, 0);
    });

    const heroOffset = new Position(-8, -21);
    const heroPosX = this.heroPosition.x + heroOffset.x;
    const heroPosY = this.heroPosition.y + heroOffset.y;
    let shadowPosX = heroPosX;
    let shadowPosY = heroPosY;

    const shadow = new Sprite({
      asset: this.resources.availableAssets['shadow'] as unknown as Asset,
      frameSize: new Position(32, 32),
    } as unknown as SpriteContext);

    var currentHours = new Date().getHours();
    if (currentHours > 12) {
      shadowPosX += currentHours / 10;
    } else {
      shadowPosX -= (12 - currentHours) / 10;
    }

    shadow.renderSprite(
      context as unknown as CanvasRenderingContext2D,
      shadowPosX,
      shadowPosY,
    );

    this.hero.renderSprite(
      context as unknown as CanvasRenderingContext2D,
      heroPosX,
      heroPosY,
    );
  }
}

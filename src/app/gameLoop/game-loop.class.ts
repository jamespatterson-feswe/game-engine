import { DestroyRef, Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { timer } from 'rxjs';
import { Asset, Position, Resources, Sprite, SpriteContext } from '../utils';
import { UserInput } from '../utils/userInput/user-input.class';
import { HeroService } from '../services';
import { fps } from '.';

@Injectable()
export class GameLoop {
  private readonly destroyRef = inject(DestroyRef);
  private readonly heroService = inject(HeroService);

  private hasGameStarted = false;
  private isRunning = false;
  private userInput = new UserInput();

  constructor() {
    this.userInput.movementPostition$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        if (this.isRunning) {
          const positionToMoveTo = new Position(value.x, value.y, true);
          const finalPosition = positionToMoveTo.combinedPositions(
            this.heroService.heroPosition,
          );

          if (finalPosition.isSpaceFree()) {
            this.heroService.heroPosition.movePositions(positionToMoveTo);
          }
        }
      });

    timer(fps, fps)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        if (this.hasGameStarted && this.isRunning) {
          const canvas: HTMLCanvasElement | null =
            document.querySelector('#game-canvas');
          const context = canvas?.getContext('2d');

          if (context) {
            this.renderStationary(context as unknown as CanvasRenderingContext2D);
            this.heroService.renderHero(context as unknown as CanvasRenderingContext2D);
          }
        }
      });
  }

  public run(): void {
    this.hasGameStarted = true;
    this.isRunning = true;
  }

  public pause(): void {
    this.isRunning = false;
  }

  private renderStationary(context: CanvasRenderingContext2D): void {
    const resources = new Resources();
    const stationary = [
      resources.availableAssets['sky'],
      resources.availableAssets['ground'],
    ];

    stationary.forEach((asset) => {
      const sprite = new Sprite({
        asset,
        frameSize: new Position(320, 180),
      } as unknown as SpriteContext);

      sprite.renderSprite(context, 0, 0);
    });
  }
}

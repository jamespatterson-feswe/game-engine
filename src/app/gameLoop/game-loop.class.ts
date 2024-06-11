import { DestroyRef, Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { mergeMap, timer } from 'rxjs';
import {
  AnimationDirections,
  Position,
  Resources,
  Sprite,
  SpriteContext,
  walkingAnimations,
  PartialFrame,
} from '../utils';
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
  private walkingAnimation!: PartialFrame[];

  constructor() {
    this.userInput.movementDirection$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        mergeMap((direction: AnimationDirections) => {
          this.walkingAnimation = walkingAnimations[direction].frames;
          return timer(100, 400);
        }),
      )
      .subscribe(() => {
        const animation = this.walkingAnimation[0];

        this.heroService.setHeroFrame(animation.frame);

        this.walkingAnimation.reverse().pop();
        this.walkingAnimation.reverse().push(animation);
      });

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
          const context = this.getContext();

          if (context) {
            this.renderStationary(
              context as unknown as CanvasRenderingContext2D,
            );
            this.heroService.renderHero(
              context as unknown as CanvasRenderingContext2D,
            );
          }
        }
      });
  }

  private getContext(): CanvasRenderingContext2D | null | undefined {
    const canvas: HTMLCanvasElement | null =
      document.querySelector('#game-canvas');
    return canvas?.getContext('2d');
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

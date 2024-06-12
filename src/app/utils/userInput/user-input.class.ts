import { DestroyRef, Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, delay, fromEvent, merge } from 'rxjs';
import {
  Movements,
  keyCodeMap,
  walkingAnimations,
} from './config/user-input.config';
import { Position } from '../position';
import { AnimationDirections } from './interface/user-input.interface';
import { HeroService } from '../../services';

@Injectable()
export class UserInput {
  private readonly destroyRef = inject(DestroyRef);
  private readonly heroService = inject(HeroService);

  private movementDirection: Subject<AnimationDirections> =
    new Subject<AnimationDirections>();
  public movementDirection$ = this.movementDirection.asObservable();
  private movementPostition = new Subject<Position>();
  public movementPostition$ = this.movementPostition.asObservable();

  constructor() {
    fromEvent(window, 'keydown')
      .pipe(takeUntilDestroyed(this.destroyRef), delay(50))
      .subscribe((response) => {
        const movement = keyCodeMap.get(
          (response as unknown as KeyboardEvent).code as Movements,
        );

        if (movement) {
          switch ((response as unknown as KeyboardEvent).code) {
            case Movements.UP:
              this.setHeroFrameDirection(AnimationDirections.UP);
              break;
            case Movements.DOWN:
              this.setHeroFrameDirection(AnimationDirections.DOWN);
              break;
            case Movements.LEFT:
              this.setHeroFrameDirection(AnimationDirections.LEFT);
              break;
            case Movements.RIGHT:
              this.setHeroFrameDirection(AnimationDirections.RIGHT);
              break;
            default:
              break;
          }

          this.movementPostition.next(movement);
        }
      });
  }

  private setHeroFrameDirection(direction: AnimationDirections): void {
    this.movementDirection.next(direction);
    this.heroService.setHeroFrame(
      walkingAnimations[direction].frames[0].frame,
    );
  }
}

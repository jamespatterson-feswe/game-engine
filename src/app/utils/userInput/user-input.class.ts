import { DestroyRef, Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, Subject, fromEvent } from 'rxjs';
import {
  Movements,
  defaultMovement,
  keyCodeMap,
} from './config/user-input.config';
import { Position } from '../position';
import { AnimationDirections } from './interface/user-input.interface';

@Injectable()
export class UserInput {
  private destroyRef = inject(DestroyRef);

  private movementDirection: Subject<AnimationDirections> =
    new Subject<AnimationDirections>();
  public movementDirection$ = this.movementDirection.asObservable();
  private movementPostition = new BehaviorSubject<Position>(defaultMovement);
  public movementPostition$ = this.movementPostition.asObservable();

  constructor() {
    fromEvent(window, 'keyup')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        console.log(value);
        const movement = keyCodeMap.get(
          (value as unknown as KeyboardEvent).code as Movements,
        );

        if (movement) {
          switch ((value as unknown as KeyboardEvent).code) {
            case Movements.UP:
              this.movementDirection.next(AnimationDirections.UP);
              break;
            case Movements.DOWN:
              this.movementDirection.next(AnimationDirections.DOWN);
              break;
            case Movements.LEFT:
              this.movementDirection.next(AnimationDirections.LEFT);
              break;
            case Movements.RIGHT:
              this.movementDirection.next(AnimationDirections.RIGHT);
              break;
            default:
              break;
          }
        }
      });

    fromEvent(window, 'keydown')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        const movement = keyCodeMap.get(
          (value as unknown as KeyboardEvent).code as Movements,
        );

        if (movement) {
          switch ((value as unknown as KeyboardEvent).code) {
            case Movements.UP:
              this.movementDirection.next(AnimationDirections.UP);
              break;
            case Movements.DOWN:
              this.movementDirection.next(AnimationDirections.DOWN);
              break;
            case Movements.LEFT:
              this.movementDirection.next(AnimationDirections.LEFT);
              break;
            case Movements.RIGHT:
              this.movementDirection.next(AnimationDirections.RIGHT);
              break;
            default:
              break;
          }

          this.movementPostition.next(movement);
        }
      });
  }
}

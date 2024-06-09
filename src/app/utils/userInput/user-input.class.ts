import { DestroyRef, Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, fromEvent, share } from 'rxjs';
import {
  Movements,
  defaultMovement,
  keyCodeMap,
} from './config/user-input.config';
import { Position } from '../position';

@Injectable()
export class UserInput {
  private destroyRef = inject(DestroyRef);
  public movementPostition$ = new BehaviorSubject<Position>(defaultMovement);

  constructor() {
    fromEvent(window, 'keydown')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        const movement = keyCodeMap.get(
          (value as unknown as KeyboardEvent).code as Movements,
        );

        if (movement) {
          this.movementPostition$.next(movement);
        }
      });
  }

  public movementRendered(): void {
    this.movementPostition$.next(defaultMovement);
  }
}

import { DestroyRef, Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, fromEvent } from 'rxjs';
import {
  Movements,
  defaultMovement,
  keyCodeMap,
} from './config/user-input.config';
import { Position } from '../position';

@Injectable()
export class UserInput {
  private destroyRef = inject(DestroyRef);
  private movementPostition = new BehaviorSubject<Position>(defaultMovement);
  public movementPostition$ = this.movementPostition.asObservable();

  constructor() {
    fromEvent(window, 'keydown')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        const movement = keyCodeMap.get(
          (value as unknown as KeyboardEvent).code as Movements,
        );

        /** @todo Add in dynamic frames for the hero, mimic walking, running, etc */

        if (movement) {
          this.movementPostition.next(movement);
        }
      });
  }
}

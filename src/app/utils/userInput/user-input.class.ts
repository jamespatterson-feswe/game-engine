import { DestroyRef, Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent, share } from 'rxjs';
import { keyCodeMap, keyCodes } from './config/user-input.config';
import { Position } from '../position';

@Injectable()
export class UserInput {
  private destroyRef = inject(DestroyRef);
  private keydown$ = fromEvent(window, 'keydown').pipe(share());
  private movementPostition = new Position(0, 0);

  constructor() {
    this.keydown$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        const movement = keyCodeMap.get(
          (value as unknown as KeyboardEvent).code,
        );

        if (movement) {
          // console.log((value as any).code);
          this.movementPostition.movePositions(
            new Position(movement.x, movement.y),
          );
          console.log(this.movementPostition);
        }
      });
  }
}

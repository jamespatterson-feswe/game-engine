import { Position } from '../../position';

export const defaultMovement = new Position(0, 0);

export const enum Movements {
  LEFT = 'KeyA',
  UP = 'KeyW',
  RIGHT = 'KeyD',
  DOWN = 'KeyS',
}

export const keyCodeMap: Map<Movements, Position> = new Map();

keyCodeMap.set(Movements.LEFT, new Position(-1, 0));
keyCodeMap.set(Movements.UP, new Position(0, -1));
keyCodeMap.set(Movements.RIGHT, new Position(1, 0));
keyCodeMap.set(Movements.DOWN, new Position(0, 1));

import { AnimationDirections } from './../interface/user-input.interface';
import { Position } from '../../position';
import { Animation, Animations } from '../interface/user-input.interface';

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

/**
 * @description To animate a character or sprite to simulate a walking experience
 *
 * @function generateWalkingAnimation
 * @param start The given starting point
 * @returns Animation
 */
const generateWalkingAnimation = (start: number): Animation => {
  return {
    duration: 400,
    frames: [
      {
        time: 0,
        frame: start + 1,
      },
      {
        time: 100,
        frame: start,
      },
      {
        time: 200,
        frame: start + 1,
      },
      {
        time: 300,
        frame: start + 2,
      },
    ],
  };
};

/**
 * @description To simulate a stationary character
 *
 * @function generateStationary
 * @param start The given starting point
 * @todo Add additional animatons for blinking or foot tapping, etc
 * @returns Animation
 */
const generateStationary = (start: number): Animation => {
  return {
    duration: 400,
    frames: [
      {
        time: 0,
        frame: start,
      },
    ],
  };
};

export const walkingAnimations: Animations = {
  [AnimationDirections.UP]: generateWalkingAnimation(6),
  [AnimationDirections.DOWN]: generateWalkingAnimation(0),
  [AnimationDirections.LEFT]: generateWalkingAnimation(9),
  [AnimationDirections.RIGHT]: generateWalkingAnimation(3),
};

export const stationaryAnimations: Animations = {
  [AnimationDirections.UP]: generateStationary(1),
  [AnimationDirections.DOWN]: generateStationary(4),
  [AnimationDirections.LEFT]: generateStationary(7),
  [AnimationDirections.RIGHT]: generateStationary(10),
};

export enum AnimationDirections {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

export type Animations = {
  [k in AnimationDirections]: Animation;
};

export interface PartialFrame {
  time: number;
  frame: number;
}

export interface Animation {
  duration: number;
  frames: PartialFrame[];
}

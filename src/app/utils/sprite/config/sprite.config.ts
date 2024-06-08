import { Position } from '../../position';
import { Asset } from '../../resources';
import { SpriteContext } from '../interface/sprite.interface';

const defaultPosition = 16;

export const spriteContext: SpriteContext = {
  asset: null as unknown as Asset,
  frameSize: new Position(defaultPosition, defaultPosition),
  horizontalFrames: 1,
  verticalFrames: 1,
  frame: 0,
  scale: 1,
  position: new Position(0, 0),
};

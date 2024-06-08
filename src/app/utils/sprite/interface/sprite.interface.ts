import { Coordinates } from '../../position';
import { Asset } from '../../resources';

export interface SpriteContext {
  asset: Asset;
  frameSize: Coordinates;
  horizontalFrames: number;
  verticalFrames: number;
  frame: number;
  scale: number;
  position: Coordinates;
}

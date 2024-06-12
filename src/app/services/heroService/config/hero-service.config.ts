import { Asset, Position, Resources, SpriteContext } from "../../../utils";
import { HeroDetails } from "../interface/hero.interface";

export const defaultHeroSprite = {
  asset: new Resources().availableAssets['hero'] as unknown as Asset,
  frameSize: new Position(32, 32),
  horizontalFrames: 3,
  verticalFrames: 8,
  frame: 1,
} as unknown as SpriteContext;

export const heroDetails: HeroDetails = {
  hp: 100,
  ap: 100,
  name: 'Max Fury',
  moves: {
    punch: {
      hp: 25,
    },
    kick: {
      hp: 35,
    },
  },
  specials: [
    {
      name: 'Super Punch',
      hp: 55,
    },
  ],
  summons: ['American Bald Eagle'],
};

export const startingPositions: Map<number, Position> = new Map();

startingPositions.set(0, new Position(16 * 6, 16 * 5));

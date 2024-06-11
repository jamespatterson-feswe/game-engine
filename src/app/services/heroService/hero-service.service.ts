import { Injectable } from '@angular/core';
import { Asset, Position, Resources, Sprite, SpriteContext } from '../../utils';

interface HeroDetails {
  hp: number;
  ap: number;
  name: string;
  moves: {
    [k: string]: {
      hp: number;
    };
  };
  specials: {
    name: string;
    hp: number;
  }[];
  summons: string[];
}

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private resources = new Resources();
  private hero = new Sprite({
    asset: this.resources.availableAssets['hero'] as unknown as Asset,
    frameSize: new Position(32, 32),
    horizontalFrames: 3,
    verticalFrames: 8,
    frame: 1,
  } as unknown as SpriteContext);

  private heroDetails: HeroDetails = {
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
        name: 'Reagan Ramble',
        hp: 55,
      },
    ],
    summons: ['American Bald Eagle'],
  };

  private startingPositions: Record<number, Position> = {
    0: new Position(16 * 6, 16 * 5),
  };

  public heroPosition: Position = this.getStartingPosition(0);

  constructor() {}

  /**
   * @description To return the created Sprite for the 'hero'
   *
   * @function getHero
   * @returns {Sprite} Hero
   */
  public getHero(): Sprite {
    return this.hero;
  }

  /**
   * @description To return a starting Position for a given level, index based
   *
   * @function getStartingPosition
   * @param level A key that coordinates to Positions
   * @returns {Position}
   */
  public getStartingPosition(level: number = 0): Position {
    return this.startingPositions[level];
  }

  /**
   * @description To return the meta data for the 'hero'
   *
   * @function getHeroDetails
   * @returns {HeroDetails}
   */
  public getHeroDetails(): HeroDetails {
    return this.heroDetails;
  }

  public setHeroFrame(frame: number = 1): void {
    if ((frame || -1) > -1) {
      this.hero.context.frame = frame as unknown as number;
    }
  }

  public renderHero(context: CanvasRenderingContext2D, frame?: number): void {
    const heroOffset = new Position(-8, -21);

    const heroPosX = this.heroPosition.x + heroOffset.x;
    const heroPosY = this.heroPosition.y + heroOffset.y;

    let shadowPosX = heroPosX;
    let shadowPosY = heroPosY;

    const shadow = new Sprite({
      asset: this.resources.availableAssets['shadow'] as unknown as Asset,
      frameSize: new Position(32, 32),
    } as unknown as SpriteContext);

    var currentHours = new Date().getHours();
    if (currentHours > 12) {
      shadowPosX += currentHours / 10;
    } else {
      shadowPosX -= (12 - currentHours) / 10;
    }

    shadow.renderSprite(
      context as unknown as CanvasRenderingContext2D,
      shadowPosX,
      shadowPosY,
    );

    this.hero.renderSprite(
      context as unknown as CanvasRenderingContext2D,
      heroPosX,
      heroPosY,
    );
  }
}

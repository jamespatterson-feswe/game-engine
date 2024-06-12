import { Injectable } from '@angular/core';
import { Asset, Position, Resources, Sprite, SpriteContext } from '../../utils';
import { HeroDetails } from './interface/hero.interface';
import { defaultHeroSprite, heroDetails, startingPositions } from './config/hero-service.config';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private hero = new Sprite(defaultHeroSprite);
  private heroDetails: HeroDetails = heroDetails;
  public heroPosition: Position = this.getStartingPosition(0);

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
   * @description To return the meta data for the 'hero'
   *
   * @function getHeroDetails
   * @returns {HeroDetails}
   */
  public getHeroDetails(): HeroDetails {
    return this.heroDetails;
  }

  /**
   * @description To return a starting Position for a given level, index based
   *
   * @function getStartingPosition
   * @param level A key that coordinates to Positions
   * @returns {Position}
   */
  public getStartingPosition(level: number = 0): Position {
    const levelExist = startingPositions.has(level);

    return startingPositions.get(levelExist ? level : 0) as unknown as Position;
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
      asset: new Resources().availableAssets['shadow'] as unknown as Asset,
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

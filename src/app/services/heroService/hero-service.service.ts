import { Injectable } from '@angular/core';

interface Hero {
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
export class HeroServiceService {
  protected hero: Hero = {
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

  constructor() {}

  public getHero(): Hero {
    return this.hero;
  }
}

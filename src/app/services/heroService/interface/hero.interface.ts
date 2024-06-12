export interface HeroDetails {
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
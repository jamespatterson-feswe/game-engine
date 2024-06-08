export interface Assets {
  [k: string]: Asset;
}

export interface Asset {
  path: string;
  image: HTMLImageElement | null;
  isLoaded: boolean;
}

import { Injectable } from '@angular/core';
import { Assets } from './interfaces/resources.interface';
import { assets } from './config/resources.config';

@Injectable()
export class Resources {
  public availableAssets!: Assets;

  constructor() {
    this.availableAssets = assets;

    for (const key in this.availableAssets) {
      const asset = this.availableAssets[key];
      const image = new Image();

      image.src = asset['path'] as unknown as string;
      image.onload = () => (asset['isLoaded'] = true);

      asset['image'] = image;
    }
  }
}

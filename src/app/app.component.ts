import { Component, DestroyRef, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Asset, Position, Resources, Sprite } from './utils';
import { SpriteContext } from './utils/sprite/interface/sprite.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<canvas id="game-canvas"></canvas>`,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected canvas!: HTMLCanvasElement | null;
  protected context!: CanvasRenderingContext2D | null | undefined;
  private destroyRef = inject(DestroyRef);
  private hero!: Sprite;
  private resources = new Resources();

  constructor() {
    timer(100, 500)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.renderStationary();
      });
  }

  public ngAfterViewInit(): void {
    this.canvas = document.querySelector('#game-canvas');
    this.context = this.canvas?.getContext('2d');

    this.hero = new Sprite({
      asset: this.resources.availableAssets['hero'] as unknown as Asset,
      frameSize: new Position(32, 32),
      horizontalFrames: 3,
      verticalFrames: 8,
      frame: 1
    } as unknown as SpriteContext);
  }

  private renderStationary(): void {
    const stationary = [
      this.resources.availableAssets['sky'],
      this.resources.availableAssets['ground'],
    ];

    stationary.forEach((asset) => {
      const sprite = new Sprite({
        asset,
        frameSize: new Position(320, 180)
      } as unknown as SpriteContext);

      sprite.renderSprite(this.context as unknown as CanvasRenderingContext2D, 0, 0);
    });

    this.hero.renderSprite(this.context as unknown as CanvasRenderingContext2D, 16 * 5, 16 * 5);
  }
}

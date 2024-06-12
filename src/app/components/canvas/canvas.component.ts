import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameLoop } from '../../gameLoop';
import { HeroDetails, HeroService } from '../../services';

@Component({
  selector: 'app-canvas',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <canvas id="game-canvas"></canvas>
    <div id="game-hud">
      <p id="hud-option">
        Name: <span id="option-details">{{ heroDetails.name }}</span>
      </p>
      <p id="hud-option">HP: <span id="option-details">{{ heroDetails.hp }}</span></p>
      <p id="hud-option">AP: <span id="option-details">{{ heroDetails.ap }}</span></p>
    </div>
  `,
  styleUrl: './canvas.component.scss',
})
export class CanvasComponent {
  private readonly heroService = inject(HeroService);

  private readonly game = new GameLoop();
  protected heroDetails: HeroDetails = this.heroService.getHeroDetails();

  constructor() {
    this.game.run();
  }
}

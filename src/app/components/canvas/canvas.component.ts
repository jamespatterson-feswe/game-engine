import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameLoop } from '../../gameLoop';

@Component({
  selector: 'app-canvas',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <canvas id="game-canvas"></canvas>
    <div id="game-hud">
      <p id="hud-option">Name: <span id="option-details">Ronald Abraham Washington the 3rd</span></p>
      <p id="hud-option">HP: <span id="option-details">100</span></p>
      <p id="hud-option">AP: <span id="option-details">50</span></p>
    </div>
  `,
  styleUrl: './canvas.component.scss',
})
export class CanvasComponent {
  private game = new GameLoop();

  constructor() {
    this.game.run();
  }
}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameLoop } from './gameLoop/game-loop.class';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<canvas id="game-canvas"></canvas>`,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private game = new GameLoop();

  constructor() {
    this.game.run();
  }
}

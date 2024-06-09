import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameLoop } from './game-loop.class';

describe('GameLoop', () => {
  let component: GameLoop;
  let fixture: ComponentFixture<GameLoop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameLoop],
    }).compileComponents();

    fixture = TestBed.createComponent(GameLoop);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('GameLoop', () => {
    it('should create successfully', () => {
      expect(component).toBeTruthy();
    });
  });
});

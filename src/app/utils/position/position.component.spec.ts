import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Position } from './position.component';

describe('Position', () => {
  let component: Position;
  let fixture: ComponentFixture<Position>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Position],
    }).compileComponents();

    fixture = TestBed.createComponent(Position);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Position', () => {
    it('should create successfully', () => {
      expect(component).toBeTruthy();
    });
  });
});
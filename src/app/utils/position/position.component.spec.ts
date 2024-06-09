import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Position } from './position.component';

describe('Position', () => {
  let position: Position;
  let fixture: ComponentFixture<Position>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Position],
    }).compileComponents();

    position = new Position(0, 0);
  });

  describe('Position', () => {
    it('should create successfully', () => {
      expect(position).toBeTruthy();
    });
  });

  describe('movePositions', () => {
    it('should expect our Position to shift', () => {
      const testPosition = new Position(3, 1);

      testPosition.movePositions(new Position(1, 1));
      expect(testPosition.x).toBe(4);
      expect(testPosition.y).toBe(2);
      testPosition.movePositions(new Position(0, -1));
      expect(testPosition.x).toBe(4);
      expect(testPosition.y).toBe(1);
    });

    it('should expect our Position not to shift if there is no x or y coordinates', () => {
      const testPosition = new Position(3, 1);

      testPosition.movePositions(new Position(1, 1));
      expect(testPosition.x).toBe(4);
      expect(testPosition.y).toBe(2);
      testPosition.movePositions(undefined as unknown as Position);
      expect(testPosition.x).toBe(4);
      expect(testPosition.y).toBe(2);
      testPosition.movePositions(new Position(undefined as unknown as number, undefined as unknown as number));
      expect(testPosition.x).toBe(4);
      expect(testPosition.y).toBe(2);
    });
  });
});

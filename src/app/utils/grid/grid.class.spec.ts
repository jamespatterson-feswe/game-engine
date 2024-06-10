import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Grid } from './grid.class';

describe('Grid', () => {
  let component: Grid;
  let fixture: ComponentFixture<Grid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Grid],
    }).compileComponents();

    fixture = TestBed.createComponent(Grid);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Grid', () => {
    it('should create successfully', () => {
      expect(component).toBeTruthy();
    });
  });
});

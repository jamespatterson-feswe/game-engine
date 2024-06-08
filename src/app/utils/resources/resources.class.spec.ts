import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Resources } from './resources.class';

describe('Resources', () => {
  let component: Resources;
  let fixture: ComponentFixture<Resources>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Resources],
    }).compileComponents();

    fixture = TestBed.createComponent(Resources);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Resources', () => {
    it('should create successfully', () => {
      expect(component).toBeTruthy();
    });
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sprite } from './sprite.class';

describe('Sprite', () => {
  let component: Sprite;
  let fixture: ComponentFixture<Sprite>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sprite],
    }).compileComponents();

    fixture = TestBed.createComponent(Sprite);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Sprite', () => {
    it('should create successfully', () => {
      expect(component).toBeTruthy();
    });
  });
});

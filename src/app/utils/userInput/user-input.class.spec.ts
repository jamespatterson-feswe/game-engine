import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInput } from './user-input.class';

describe('UserInput', () => {
  let component: UserInput;
  let fixture: ComponentFixture<UserInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserInput],
    }).compileComponents();

    fixture = TestBed.createComponent(UserInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('UserInput', () => {
    it('should create successfully', () => {
      expect(component).toBeTruthy();
    });
  });
});

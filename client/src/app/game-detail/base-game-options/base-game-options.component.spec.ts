import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseGameOptionsComponent } from './base-game-options.component';

describe('BaseGameOptionsComponent', () => {
  let component: BaseGameOptionsComponent;
  let fixture: ComponentFixture<BaseGameOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseGameOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseGameOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

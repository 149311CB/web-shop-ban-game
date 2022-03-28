import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandInputComponent } from './expand-input.component';

describe('ExpandInputComponent', () => {
  let component: ExpandInputComponent;
  let fixture: ComponentFixture<ExpandInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpandInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

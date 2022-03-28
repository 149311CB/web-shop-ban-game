import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BriefInfoComponent } from './brief-info.component';

describe('BriefInfoComponent', () => {
  let component: BriefInfoComponent;
  let fixture: ComponentFixture<BriefInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BriefInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

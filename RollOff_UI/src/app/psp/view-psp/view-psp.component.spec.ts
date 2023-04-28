import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPspComponent } from './view-psp.component';

describe('ViewPspComponent', () => {
  let component: ViewPspComponent;
  let fixture: ComponentFixture<ViewPspComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPspComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPspComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

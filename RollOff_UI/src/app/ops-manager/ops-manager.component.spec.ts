import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpsManagerComponent } from './ops-manager.component';

describe('OpsManagerComponent', () => {
  let component: OpsManagerComponent;
  let fixture: ComponentFixture<OpsManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpsManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

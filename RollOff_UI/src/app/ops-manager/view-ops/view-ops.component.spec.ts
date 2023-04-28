import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOpsComponent } from './view-ops.component';

describe('ViewOpsComponent', () => {
  let component: ViewOpsComponent;
  let fixture: ComponentFixture<ViewOpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewOpsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewOpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

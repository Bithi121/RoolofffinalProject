import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAccountsRequestComponent } from './view-accounts-request.component';

describe('ViewAccountsRequestComponent', () => {
  let component: ViewAccountsRequestComponent;
  let fixture: ComponentFixture<ViewAccountsRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAccountsRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAccountsRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

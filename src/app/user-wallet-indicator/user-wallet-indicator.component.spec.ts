import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWalletIndicatorComponent } from './user-wallet-indicator.component';

describe('UserWalletIndicatorComponent', () => {
  let component: UserWalletIndicatorComponent;
  let fixture: ComponentFixture<UserWalletIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserWalletIndicatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserWalletIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

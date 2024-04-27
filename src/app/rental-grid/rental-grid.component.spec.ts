import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalGridComponent } from './rental-grid.component';

describe('RentalGridComponent', () => {
  let component: RentalGridComponent;
  let fixture: ComponentFixture<RentalGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentalGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

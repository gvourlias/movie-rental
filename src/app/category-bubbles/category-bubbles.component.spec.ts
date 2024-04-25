import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryBubblesComponent } from './category-bubbles.component';

describe('CategoryBubblesComponent', () => {
  let component: CategoryBubblesComponent;
  let fixture: ComponentFixture<CategoryBubblesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryBubblesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryBubblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

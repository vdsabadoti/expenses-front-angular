import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseParentComponent } from './expense-parent.component';

describe('ExpenseParentComponent', () => {
  let component: ExpenseParentComponent;
  let fixture: ComponentFixture<ExpenseParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseParentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpenseParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

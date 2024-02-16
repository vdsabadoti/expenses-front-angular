import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseLineDetailComponent } from './expense-line-detail.component';

describe('ExpenseLineDetailComponent', () => {
  let component: ExpenseLineDetailComponent;
  let fixture: ComponentFixture<ExpenseLineDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseLineDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpenseLineDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

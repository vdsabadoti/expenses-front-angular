import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesFlowComponent } from './expenses-flow.component';

describe('ExpensesFlowComponent', () => {
  let component: ExpensesFlowComponent;
  let fixture: ComponentFixture<ExpensesFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpensesFlowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpensesFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

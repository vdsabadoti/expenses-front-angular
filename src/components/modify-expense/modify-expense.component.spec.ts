import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyExpenseComponent } from './modify-expense.component';

describe('CreateExpenseComponent', () => {
  let component: ModifyExpenseComponent;
  let fixture: ComponentFixture<ModifyExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyExpenseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

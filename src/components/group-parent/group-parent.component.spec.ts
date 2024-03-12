import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupParentComponent } from './group-parent.component';

describe('ExpenseParentComponent', () => {
  let component: GroupParentComponent;
  let fixture: ComponentFixture<GroupParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupParentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

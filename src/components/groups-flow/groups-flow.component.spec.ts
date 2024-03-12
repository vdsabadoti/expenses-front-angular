import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsFlowComponent } from './groups-flow.component';

describe('ExpensesFlowComponent', () => {
  let component: GroupsFlowComponent;
  let fixture: ComponentFixture<GroupsFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupsFlowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupsFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

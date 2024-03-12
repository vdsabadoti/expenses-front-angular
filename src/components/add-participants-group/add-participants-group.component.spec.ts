import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddParticipantsGroupComponent } from './add-participants-group.component';

describe('AddParticipantsLineComponent', () => {
  let component: AddParticipantsGroupComponent;
  let fixture: ComponentFixture<AddParticipantsGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddParticipantsGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddParticipantsGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

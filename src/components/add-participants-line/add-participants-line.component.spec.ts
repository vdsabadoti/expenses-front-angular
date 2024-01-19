import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddParticipantsLineComponent } from './add-participants-line.component';

describe('AddParticipantsLineComponent', () => {
  let component: AddParticipantsLineComponent;
  let fixture: ComponentFixture<AddParticipantsLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddParticipantsLineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddParticipantsLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

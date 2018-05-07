import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBankDetailsCardComponent } from './profile-bank-details-card.component';

describe('ProfileBankDetailsCardComponent', () => {
  let component: ProfileBankDetailsCardComponent;
  let fixture: ComponentFixture<ProfileBankDetailsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileBankDetailsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileBankDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

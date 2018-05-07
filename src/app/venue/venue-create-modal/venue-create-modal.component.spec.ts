import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueCreateModalComponent } from './venue-create-modal.component';

describe('VenueCreateModalComponent', () => {
  let component: VenueCreateModalComponent;
  let fixture: ComponentFixture<VenueCreateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenueCreateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

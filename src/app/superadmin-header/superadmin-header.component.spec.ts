import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperadminHeaderComponent } from './superadmin-header.component';

describe('SuperadminHeaderComponent', () => {
  let component: SuperadminHeaderComponent;
  let fixture: ComponentFixture<SuperadminHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperadminHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperadminHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

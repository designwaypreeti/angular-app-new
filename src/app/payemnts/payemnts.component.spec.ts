import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayemntsComponent } from './payemnts.component';

describe('PayemntsComponent', () => {
  let component: PayemntsComponent;
  let fixture: ComponentFixture<PayemntsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayemntsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayemntsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

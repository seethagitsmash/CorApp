import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdTpMixComponent } from './od-tp-mix.component';

describe('OdTpMixComponent', () => {
  let component: OdTpMixComponent;
  let fixture: ComponentFixture<OdTpMixComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OdTpMixComponent]
    });
    fixture = TestBed.createComponent(OdTpMixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldcarInfoComponent } from './oldcar-info.component';

describe('OldcarInfoComponent', () => {
  let component: OldcarInfoComponent;
  let fixture: ComponentFixture<OldcarInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OldcarInfoComponent]
    });
    fixture = TestBed.createComponent(OldcarInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessMixComponent } from './business-mix.component';

describe('BusinessMixComponent', () => {
  let component: BusinessMixComponent;
  let fixture: ComponentFixture<BusinessMixComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusinessMixComponent]
    });
    fixture = TestBed.createComponent(BusinessMixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

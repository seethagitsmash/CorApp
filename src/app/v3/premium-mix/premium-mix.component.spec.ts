import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumMixComponent } from './premium-mix.component';

describe('PremiumMixComponent', () => {
  let component: PremiumMixComponent;
  let fixture: ComponentFixture<PremiumMixComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PremiumMixComponent]
    });
    fixture = TestBed.createComponent(PremiumMixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulatorSelectionComponent } from './simulator-selection.component';

describe('SimulatorSelectionComponent', () => {
  let component: SimulatorSelectionComponent;
  let fixture: ComponentFixture<SimulatorSelectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SimulatorSelectionComponent]
    });
    fixture = TestBed.createComponent(SimulatorSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

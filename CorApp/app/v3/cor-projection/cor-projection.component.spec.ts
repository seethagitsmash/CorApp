import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorProjectionComponent } from './cor-projection.component';

describe('CorProjectionComponent', () => {
  let component: CorProjectionComponent;
  let fixture: ComponentFixture<CorProjectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CorProjectionComponent]
    });
    fixture = TestBed.createComponent(CorProjectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtypeStpComponent } from './btype-stp.component';

describe('BtypeStpComponent', () => {
  let component: BtypeStpComponent;
  let fixture: ComponentFixture<BtypeStpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BtypeStpComponent]
    });
    fixture = TestBed.createComponent(BtypeStpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

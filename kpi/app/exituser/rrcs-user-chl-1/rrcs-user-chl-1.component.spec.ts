import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RrcsUserChl1Component } from './rrcs-user-chl-1.component';

describe('RrcsUserChl1Component', () => {
  let component: RrcsUserChl1Component;
  let fixture: ComponentFixture<RrcsUserChl1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RrcsUserChl1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RrcsUserChl1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RrcsUserChl2Component } from './rrcs-user-chl-2.component';

describe('RrcsUserChl2Component', () => {
  let component: RrcsUserChl2Component;
  let fixture: ComponentFixture<RrcsUserChl2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RrcsUserChl2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RrcsUserChl2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

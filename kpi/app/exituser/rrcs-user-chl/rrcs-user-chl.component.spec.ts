import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RrcsUserChlComponent } from './rrcs-user-chl.component';

describe('RrcsUserChlComponent', () => {
  let component: RrcsUserChlComponent;
  let fixture: ComponentFixture<RrcsUserChlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RrcsUserChlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RrcsUserChlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadsdetailsComponent } from './leadsdetails.component';

describe('LeadsdetailsComponent', () => {
  let component: LeadsdetailsComponent;
  let fixture: ComponentFixture<LeadsdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeadsdetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeadsdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

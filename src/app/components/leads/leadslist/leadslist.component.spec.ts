import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadslistComponent } from './leadslist.component';

describe('LeadslistComponent', () => {
  let component: LeadslistComponent;
  let fixture: ComponentFixture<LeadslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeadslistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeadslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

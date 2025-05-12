import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewCustomersComponent } from './overview-customers.component';

describe('OverviewCustomersComponent', () => {
  let component: OverviewCustomersComponent;
  let fixture: ComponentFixture<OverviewCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverviewCustomersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewContractsComponent } from './overview-contracts.component';

describe('OverviewContractsComponent', () => {
  let component: OverviewContractsComponent;
  let fixture: ComponentFixture<OverviewContractsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverviewContractsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

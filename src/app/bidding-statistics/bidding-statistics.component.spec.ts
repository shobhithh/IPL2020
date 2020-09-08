import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiddingStatisticsComponent } from './bidding-statistics.component';

describe('BiddingStatisticsComponent', () => {
  let component: BiddingStatisticsComponent;
  let fixture: ComponentFixture<BiddingStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiddingStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiddingStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

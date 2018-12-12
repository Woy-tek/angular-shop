import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualPromotionsComponent } from './actual-promotions.component';

describe('ActualPromotionsComponent', () => {
  let component: ActualPromotionsComponent;
  let fixture: ComponentFixture<ActualPromotionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualPromotionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualPromotionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

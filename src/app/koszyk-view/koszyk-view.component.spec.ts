import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KoszykViewComponent } from './koszyk-view.component';

describe('KoszykViewComponent', () => {
  let component: KoszykViewComponent;
  let fixture: ComponentFixture<KoszykViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KoszykViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KoszykViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

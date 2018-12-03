import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KoszykComponent } from './koszyk.component';

describe('KoszykComponent', () => {
  let component: KoszykComponent;
  let fixture: ComponentFixture<KoszykComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KoszykComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KoszykComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduktComponent } from './produkt.component';

describe('ProduktComponent', () => {
  let component: ProduktComponent;
  let fixture: ComponentFixture<ProduktComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProduktComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduktComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

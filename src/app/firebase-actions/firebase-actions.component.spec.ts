import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirebaseActionsComponent } from './firebase-actions.component';

describe('FirebaseActionsComponent', () => {
  let component: FirebaseActionsComponent;
  let fixture: ComponentFixture<FirebaseActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirebaseActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirebaseActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

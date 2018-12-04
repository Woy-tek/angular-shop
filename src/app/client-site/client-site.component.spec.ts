import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSiteComponent } from './client-site.component';

describe('ClientSiteComponent', () => {
  let component: ClientSiteComponent;
  let fixture: ComponentFixture<ClientSiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientSiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

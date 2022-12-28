import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavKupacComponent } from './nav-kupac.component';

describe('NavKupacComponent', () => {
  let component: NavKupacComponent;
  let fixture: ComponentFixture<NavKupacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavKupacComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavKupacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

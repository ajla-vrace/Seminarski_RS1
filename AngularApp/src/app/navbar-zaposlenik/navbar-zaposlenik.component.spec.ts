import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarZaposlenikComponent } from './navbar-zaposlenik.component';

describe('NavbarZaposlenikComponent', () => {
  let component: NavbarZaposlenikComponent;
  let fixture: ComponentFixture<NavbarZaposlenikComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarZaposlenikComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarZaposlenikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

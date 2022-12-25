import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilZaposlenikComponent } from './profil-zaposlenik.component';

describe('ProfilZaposlenikComponent', () => {
  let component: ProfilZaposlenikComponent;
  let fixture: ComponentFixture<ProfilZaposlenikComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilZaposlenikComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilZaposlenikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

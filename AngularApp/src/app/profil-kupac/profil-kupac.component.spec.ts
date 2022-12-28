import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilKupacComponent } from './profil-kupac.component';

describe('ProfilKupacComponent', () => {
  let component: ProfilKupacComponent;
  let fixture: ComponentFixture<ProfilKupacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilKupacComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilKupacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

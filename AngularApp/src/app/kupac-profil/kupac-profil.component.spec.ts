import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KupacProfilComponent } from './kupac-profil.component';

describe('KupacProfilComponent', () => {
  let component: KupacProfilComponent;
  let fixture: ComponentFixture<KupacProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KupacProfilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KupacProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

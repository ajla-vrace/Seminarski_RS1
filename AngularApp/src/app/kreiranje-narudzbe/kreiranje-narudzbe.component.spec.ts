import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KreiranjeNarudzbeComponent } from './kreiranje-narudzbe.component';

describe('KreiranjeNarudzbeComponent', () => {
  let component: KreiranjeNarudzbeComponent;
  let fixture: ComponentFixture<KreiranjeNarudzbeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KreiranjeNarudzbeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KreiranjeNarudzbeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

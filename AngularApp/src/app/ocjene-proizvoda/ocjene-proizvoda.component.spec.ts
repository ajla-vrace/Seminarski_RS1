import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcjeneProizvodaComponent } from './ocjene-proizvoda.component';

describe('OcjeneProizvodaComponent', () => {
  let component: OcjeneProizvodaComponent;
  let fixture: ComponentFixture<OcjeneProizvodaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OcjeneProizvodaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OcjeneProizvodaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

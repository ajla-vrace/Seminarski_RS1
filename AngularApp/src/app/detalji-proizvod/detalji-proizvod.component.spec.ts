import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaljiProizvodComponent } from './detalji-proizvod.component';

describe('DetaljiProizvodComponent', () => {
  let component: DetaljiProizvodComponent;
  let fixture: ComponentFixture<DetaljiProizvodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetaljiProizvodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetaljiProizvodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaposlenikDetaljiComponent } from './zaposlenik-detalji.component';

describe('ZaposlenikDetaljiComponent', () => {
  let component: ZaposlenikDetaljiComponent;
  let fixture: ComponentFixture<ZaposlenikDetaljiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZaposlenikDetaljiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZaposlenikDetaljiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

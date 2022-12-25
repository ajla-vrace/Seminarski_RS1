import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaposlenikPocetnaComponent } from './zaposlenik-pocetna.component';

describe('ZaposlenikPocetnaComponent', () => {
  let component: ZaposlenikPocetnaComponent;
  let fixture: ComponentFixture<ZaposlenikPocetnaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZaposlenikPocetnaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZaposlenikPocetnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SezKolComponent } from './sez-kol.component';

describe('SezKolComponent', () => {
  let component: SezKolComponent;
  let fixture: ComponentFixture<SezKolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SezKolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SezKolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

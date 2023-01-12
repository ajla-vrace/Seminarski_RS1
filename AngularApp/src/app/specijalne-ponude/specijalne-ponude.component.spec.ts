import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecijalnePonudeComponent } from './specijalne-ponude.component';

describe('SpecijalnePonudeComponent', () => {
  let component: SpecijalnePonudeComponent;
  let fixture: ComponentFixture<SpecijalnePonudeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecijalnePonudeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecijalnePonudeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

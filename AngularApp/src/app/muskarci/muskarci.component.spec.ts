import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuskarciComponent } from './muskarci.component';

describe('MuskarciComponent', () => {
  let component: MuskarciComponent;
  let fixture: ComponentFixture<MuskarciComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MuskarciComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MuskarciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

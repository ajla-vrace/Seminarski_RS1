import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtkljucajComponent } from './otkljucaj.component';

describe('OtkljucajComponent', () => {
  let component: OtkljucajComponent;
  let fixture: ComponentFixture<OtkljucajComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtkljucajComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtkljucajComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

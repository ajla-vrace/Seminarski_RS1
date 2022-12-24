import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrijaviSeComponent } from './prijavi-se.component';

describe('PrijaviSeComponent', () => {
  let component: PrijaviSeComponent;
  let fixture: ComponentFixture<PrijaviSeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrijaviSeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrijaviSeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

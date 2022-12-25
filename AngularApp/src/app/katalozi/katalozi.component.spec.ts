import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KataloziComponent } from './katalozi.component';

describe('KataloziComponent', () => {
  let component: KataloziComponent;
  let fixture: ComponentFixture<KataloziComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KataloziComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KataloziComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

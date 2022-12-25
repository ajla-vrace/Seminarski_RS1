import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecPonComponent } from './spec-pon.component';

describe('SpecPonComponent', () => {
  let component: SpecPonComponent;
  let fixture: ComponentFixture<SpecPonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecPonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecPonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

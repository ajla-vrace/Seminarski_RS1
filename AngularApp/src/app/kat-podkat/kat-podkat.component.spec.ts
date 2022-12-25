import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KatPodkatComponent } from './kat-podkat.component';

describe('KatPodkatComponent', () => {
  let component: KatPodkatComponent;
  let fixture: ComponentFixture<KatPodkatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KatPodkatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KatPodkatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

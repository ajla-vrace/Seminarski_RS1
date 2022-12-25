import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvidZaposlComponent } from './evid-zaposl.component';

describe('EvidZaposlComponent', () => {
  let component: EvidZaposlComponent;
  let fixture: ComponentFixture<EvidZaposlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvidZaposlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvidZaposlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

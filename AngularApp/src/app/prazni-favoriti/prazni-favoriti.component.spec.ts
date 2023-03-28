import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrazniFavoritiComponent } from './prazni-favoriti.component';

describe('PrazniFavoritiComponent', () => {
  let component: PrazniFavoritiComponent;
  let fixture: ComponentFixture<PrazniFavoritiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrazniFavoritiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrazniFavoritiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

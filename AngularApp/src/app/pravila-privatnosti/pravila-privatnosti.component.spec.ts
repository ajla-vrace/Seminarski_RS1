import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PravilaPrivatnostiComponent } from './pravila-privatnosti.component';

describe('PravilaPrivatnostiComponent', () => {
  let component: PravilaPrivatnostiComponent;
  let fixture: ComponentFixture<PravilaPrivatnostiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PravilaPrivatnostiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PravilaPrivatnostiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

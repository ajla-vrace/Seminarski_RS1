import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritiComponent } from './favoriti.component';

describe('FavoritiComponent', () => {
  let component: FavoritiComponent;
  let fixture: ComponentFixture<FavoritiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoritiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

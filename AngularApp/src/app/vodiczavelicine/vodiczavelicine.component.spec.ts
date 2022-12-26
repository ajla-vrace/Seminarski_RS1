import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VodiczavelicineComponent } from './vodiczavelicine.component';

describe('VodiczavelicineComponent', () => {
  let component: VodiczavelicineComponent;
  let fixture: ComponentFixture<VodiczavelicineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VodiczavelicineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VodiczavelicineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZeneComponent } from './zene.component';

describe('ZeneComponent', () => {
  let component: ZeneComponent;
  let fixture: ComponentFixture<ZeneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZeneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZeneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

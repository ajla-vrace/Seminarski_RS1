import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostavkePorukeComponent } from './postavke-poruke.component';

describe('PostavkePorukeComponent', () => {
  let component: PostavkePorukeComponent;
  let fixture: ComponentFixture<PostavkePorukeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostavkePorukeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostavkePorukeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

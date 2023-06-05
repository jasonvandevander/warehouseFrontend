import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodgeComponent } from './dodge.component';

describe('DodgeComponent', () => {
  let component: DodgeComponent;
  let fixture: ComponentFixture<DodgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DodgeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DodgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

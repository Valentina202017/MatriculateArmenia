import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcercaDeMatriculateComponent } from './acerca-de-matriculate.component';

describe('AcercaDeMatriculateComponent', () => {
  let component: AcercaDeMatriculateComponent;
  let fixture: ComponentFixture<AcercaDeMatriculateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcercaDeMatriculateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcercaDeMatriculateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

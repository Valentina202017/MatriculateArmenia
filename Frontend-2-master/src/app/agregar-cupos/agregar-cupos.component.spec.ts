import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarCuposComponent } from './agregar-cupos.component';

describe('AgregarCuposComponent', () => {
  let component: AgregarCuposComponent;
  let fixture: ComponentFixture<AgregarCuposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarCuposComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarCuposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

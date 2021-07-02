import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroAcudienteComponent } from './registro-acudiente.component';

describe('RegistroAcudienteComponent', () => {
  let component: RegistroAcudienteComponent;
  let fixture: ComponentFixture<RegistroAcudienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroAcudienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroAcudienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilAcudienteComponent } from './perfil-acudiente.component';

describe('PerfilAcudienteComponent', () => {
  let component: PerfilAcudienteComponent;
  let fixture: ComponentFixture<PerfilAcudienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilAcudienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilAcudienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

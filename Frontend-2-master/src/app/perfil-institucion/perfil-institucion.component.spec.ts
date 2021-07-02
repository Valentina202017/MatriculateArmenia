import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilInstitucionComponent } from './perfil-institucion.component';

describe('PerfilInstitucionComponent', () => {
  let component: PerfilInstitucionComponent;
  let fixture: ComponentFixture<PerfilInstitucionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilInstitucionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilInstitucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

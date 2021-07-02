import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistromatriculaComponent } from './registromatricula.component';

describe('RegistromatriculaComponent', () => {
  let component: RegistromatriculaComponent;
  let fixture: ComponentFixture<RegistromatriculaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistromatriculaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistromatriculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

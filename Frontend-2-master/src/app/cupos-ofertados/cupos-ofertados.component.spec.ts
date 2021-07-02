import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuposOfertadosComponent } from './cupos-ofertados.component';

describe('CuposOfertadosComponent', () => {
  let component: CuposOfertadosComponent;
  let fixture: ComponentFixture<CuposOfertadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuposOfertadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuposOfertadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

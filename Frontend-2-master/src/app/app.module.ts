import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { AcercaDeMatriculateComponent } from './acerca-de-matriculate/acerca-de-matriculate.component';
import { PublicacionesComponent } from './publicaciones/publicaciones.component';
import { InstitucionesComponent } from './instituciones/instituciones.component';
import { RegistroAcudienteComponent } from './registro-acudiente/registro-acudiente.component';
import { RegistroEstudianteComponent } from './registro-estudiante/registro-estudiante.component';
import { LoginComponent } from './login/login.component';
import { PerfilAdministradorComponent } from './perfil-administrador/perfil-administrador.component';
import { NavComponent } from './nav/nav.component';
import { RegistroInstitucionComponent } from './registro-institucion/registro-institucion.component';
import { CuposOfertadosComponent } from './cupos-ofertados/cupos-ofertados.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { PerfilAcudienteComponent } from './perfil-acudiente/perfil-acudiente.component';
import { Nav2Component } from './nav2/nav2.component';
import { FooterComponent } from './footer/footer.component';
import { PerfilInstitucionComponent } from './perfil-institucion/perfil-institucion.component';
import { RegistromatriculaComponent } from './registromatricula/registromatricula.component';
import { AgregarCuposComponent } from './agregar-cupos/agregar-cupos.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    AcercaDeMatriculateComponent,
    PublicacionesComponent,
    InstitucionesComponent,
    RegistroAcudienteComponent,
    RegistroEstudianteComponent,
    LoginComponent,
    PerfilAdministradorComponent,
    NavComponent,
    RegistroInstitucionComponent,
    CuposOfertadosComponent,
    AdministradorComponent,
    PerfilAcudienteComponent,
    Nav2Component,
    FooterComponent,
    PerfilInstitucionComponent,
    RegistromatriculaComponent,
    AgregarCuposComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

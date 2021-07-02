import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InicioComponent} from './inicio/inicio.component';
import {AcercaDeMatriculateComponent} from './acerca-de-matriculate/acerca-de-matriculate.component';
import {InstitucionesComponent} from './instituciones/instituciones.component';
import {LoginComponent} from './login/login.component';
import {PerfilAdministradorComponent} from './perfil-administrador/perfil-administrador.component';
import {PublicacionesComponent} from './publicaciones/publicaciones.component';
import {RegistroAcudienteComponent} from './registro-acudiente/registro-acudiente.component';
import {RegistroEstudianteComponent} from './registro-estudiante/registro-estudiante.component';
import {RegistroInstitucionComponent} from './registro-institucion/registro-institucion.component';
import {CuposOfertadosComponent} from './cupos-ofertados/cupos-ofertados.component';
import {AdministradorComponent} from './administrador/administrador.component';
import {PerfilAcudienteComponent } from './perfil-acudiente/perfil-acudiente.component';
import {PerfilInstitucionComponent } from './perfil-institucion/perfil-institucion.component';
import {RegistromatriculaComponent } from './registromatricula/registromatricula.component';
import {AgregarCuposComponent } from './agregar-cupos/agregar-cupos.component';


const routes: Routes = [
{path: '', component: InicioComponent},
{path: 'AcercaDeMatriculate', component: AcercaDeMatriculateComponent},
{path: 'Instituciones', component: InstitucionesComponent},
{path: 'Login', component: LoginComponent},
{path: 'PerfilAdministrador', component: PerfilAdministradorComponent},
{path: 'Publicaciones', component: PublicacionesComponent},
{path: 'RegistroAcudiente', component: RegistroAcudienteComponent},
{path: 'RegistroEstudiante', component: RegistroEstudianteComponent},
{path: 'RegistroInstitucion', component: RegistroInstitucionComponent},
{path: 'CuposOfertados', component: CuposOfertadosComponent},
{path: 'Administrador', component: AdministradorComponent },
{path: 'PerfilAcudiente', component: PerfilAcudienteComponent },
{path: 'PerfilInstitucion', component: PerfilInstitucionComponent },
{path: 'Registromatricula/:idcolegio/:idcupo/:cupost/:gradoe/:fechai/:fechaci', component: RegistromatriculaComponent},
{path: 'AgregarCupos', component: AgregarCuposComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

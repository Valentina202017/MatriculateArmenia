import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';
import { InstitucionesService } from '../instituciones.service';

@Component({
  selector: 'app-instituciones',
  templateUrl: './instituciones.component.html',
  styleUrls: ['./instituciones.component.css']
})
export class InstitucionesComponent implements OnInit {

  instituciones;
  grados;

  constructor(
    private client: ClientService,
    private institucionService: InstitucionesService
    ) { }

  ngOnInit(): void {

    this.client.getRequestMostrarInstituciones('http://localhost:5000/api/v01/user/mostrarInstituciones').subscribe(
      (data): any => {
        this.instituciones = data["data"]
        console.log(data)
    },

      (error: any) => {
        console.log("Se ha producido un error")
    })
  }

  verMas(idInstituciones) {
    this.client.getRequestCuposInstitucion('http://localhost:5000/api/v01/user/cuposInstitucion', idInstituciones).subscribe(
      (data): any => {
        this.grados = data["data"]
        this.institucionService.grados$.emit(this.grados)
      },
      (error: any) => {
        console.log("Ha ocurrido un error")
      })
}

}

import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';
import { InstitucionesService } from '../instituciones.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cupos-ofertados',
  templateUrl: './cupos-ofertados.component.html',
  styleUrls: ['./cupos-ofertados.component.css']
})
export class CuposOfertadosComponent implements OnInit {

  cuposInstitucion;
  grados;
  institucionid;
  idcupo;
  constructor(
    private client: ClientService,
    private institucionService: InstitucionesService
  ) { }

  ngOnInit(): void {

    this.institucionService.grados$.subscribe(data => {
      this.grados = data
      console.log("Estos son los grados: ", this.grados)

    })
    ////this.client.getRequestCuposInstitucion('http://localhost:5000/api/v01/user/cuposInstitucion' ).subscribe(
    ///(data): any => {+





    /**this.cuposInstitucion = data["data"]
    console.log("Estos son los cupos:", this.cuposInstitucion)
},

(error: any) => {
  console.log("Se ha producido un error")
})



}
reservar(id) {
  console.log("Este metodo reservara y restará cupos")
}*

reservar(idC, idIns) {
  console.log("_________________-------",idC, idIns)
  this.client.postRequestReservarCupo('http://localhost:5000/api/v01/user/reservarCupo', {
  idCupo: idC,
  idInt: idIns}).subscribe(
  (response: any) => {
    console.log("Se ha hecho la resta", response)
  },
  (error) => {
  console.log(error)});

  console.log("Este metodo reservara y restará cupos")
}

*/
  }
  enviardato(codigoIns, codigoCup) {

    this.institucionid = codigoIns
    this.idcupo=codigoCup
    console.log("_________________-------", codigoIns, codigoCup)
    this.institucionService.ideInstitucion$.emit(this.institucionid)
    this.institucionService.cupos$.emit(this.idcupo)


  }

}




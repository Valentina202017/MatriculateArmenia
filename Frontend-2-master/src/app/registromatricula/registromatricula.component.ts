import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, ParamMap } from '@angular/router';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../client.service';
import { AuthService } from '../auth.service';
import { HttpParams } from '@angular/common/http';
import { isNgTemplate } from '@angular/compiler';


import Swal from 'sweetalert2/dist/sweetalert2.js';


@Component({
  selector: 'app-registromatricula',
  templateUrl: './registromatricula.component.html',
  styleUrls: ['./registromatricula.component.css']
})
export class RegistromatriculaComponent implements OnInit {
  idesEstudiantes = [];
  form: FormGroup;
  estudiantes: any;
  estudiantes2: any;
  cupos: any;
  idcolegio: any;
  idcupo: any;
  cupost: any;
  gradoe: any;
  fechai: any;
  fechaci: any;
  load: boolean = true;
  submitted = false;

  constructor(

    private client: ClientService,
    public auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,

  ) { }


  ngOnInit(): void {
    this.route.paramMap
      .subscribe((params: ParamMap) => {
        this.idcolegio = + params.get('idcolegio');
        console.log("datos id colegio", this.idcolegio)
        this.idcupo = params.get('idcupo');
        console.log("datos id cupo ", this.idcupo)
        this.cupost = + params.get('cupost');
        console.log("datos cupos totales del grado ", this.cupost)
        this.gradoe = params.get('gradoe');
        console.log("datos grado ", this.gradoe)
        this.fechai = params.get('fechai');
        console.log("datos fecha inicio  ", this.fechai)
        this.fechaci = params.get('fechaci');
        console.log("datos fecha cierre ", this.fechaci)

        //this.infoCarro = CARROS.find(item => item.id === id);
      });

    this.client.getRequestAllPersonas('http://localhost:5000/api/v01/user/datosEstudiantes', localStorage.getItem('token')).subscribe(
      (data): any => {
        this.estudiantes = data["data"]
        console.log("primer datos cudiente", data)
      },
      (error) => {

        console.log(error);


      }),
      this.client.getRequestAllPersonas('http://localhost:5000/api/v01/user/datosEstudiantes', localStorage.getItem('token')).subscribe(
        (data2): any => {
          this.estudiantes2 = data2["data2"]
          console.log("datos estudiante", data2)


        },
        (error) => {

          console.log(error);


        })


  }
  mandar() {
    let data = { 'idsEstudiantes': this.estudiantes2, 'idCupo': this.idcupo, 'idColegio': this.idcolegio }
    console.log("datos para enviar ", data)
    console.log(" token matriculacion para extracion de email", localStorage.getItem('token'))
    this.client.postRequest('http://localhost:5000/api/v01/user/generarMatricula', data, localStorage.getItem('token')).subscribe(
      (response: any) => {
        console.log("Se manda el dato", response)
        this.load = true;
        console.log(response);

        Swal.fire({
          position: 'center',
          icon: 'info',
          title: 'Matricula exitosa',
          showConfirmButton: false,
          timer: 500
        }).then(() => {
          this.router.navigate( ['/PerfilAcudiente'])
          console.log("ok")
        })
      },
      (error) => {
        console.log(error)
      })




  }/*
  reservar(idC, idIns) {
    console.log("_________________-------", idC, idIns)
    this.client.postRequestReservarCupo('http://localhost:5000/api/v01/user/reservarCupo', {
      idCupo: idC,
      idInt: idIns
    }).subscribe(
      (response: any) => {
        console.log("Se ha hecho la resta", response)
      },
      (error) => {
        console.log(error)
      });

    console.log("Este metodo reservara y restará cupos")

  }*/
}





  /*
  reservar(idC, idIns) {
    console.log("_________________-------", idC, idIns)
    this.client.postRequestReservarCupo('http://localhost:5000/api/v01/user/datosCuposEscolares', {
      idCupo: idC,
      idInt: idIns
    }).subscribe(
      (response: any) => {
        console.log("Se manda el dato", response)
      },
      (error) => {
        console.log(error)
      })
    this.client.postRequestReservarCupo('http://localhost:5000/api/v01/user/datosCuposEscolares',
      (data): any => {
        this.cupos = data["data"]
        console.log("datos cupos", data)

      }),

    console.log("Este metodo reservara y restará cupos")
  }
*/









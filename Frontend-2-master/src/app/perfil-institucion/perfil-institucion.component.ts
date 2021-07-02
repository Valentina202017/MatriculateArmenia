import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, ParamMap } from '@angular/router';
import { ClientService } from '../client.service';
import { AuthService } from '../auth.service';
import { HttpParams } from '@angular/common/http';
import { isNgTemplate } from '@angular/compiler';
import { InicioComponent }  from '../inicio/inicio.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-perfil-institucion',
  templateUrl: './perfil-institucion.component.html',
  styleUrls: ['./perfil-institucion.component.css']
})
export class PerfilInstitucionComponent implements OnInit {

  instituciones: any;
  datos;
  constructor(
    private client: ClientService,
    public auth: AuthService,
    private route: ActivatedRoute,) { }


    ngOnInit(): void {


      this.client.getRequestAllPersonas('http://localhost:5000/api/v01/user/datosInstituciones', localStorage.getItem('token')).subscribe(

        (data): any => {
          this.instituciones= data["data"]
          console.log(data)

        },
        (error) => {

          console.log(error);


        })



    }




}


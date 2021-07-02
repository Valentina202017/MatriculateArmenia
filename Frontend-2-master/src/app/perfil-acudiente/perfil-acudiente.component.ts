import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, ParamMap } from '@angular/router';
import { ClientService } from '../client.service';
import { AuthService } from '../auth.service';
import { HttpParams } from '@angular/common/http';
import { isNgTemplate } from '@angular/compiler';
import { InicioComponent }  from '../inicio/inicio.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-perfil-acudiente',
  templateUrl: './perfil-acudiente.component.html',
  styleUrls: ['./perfil-acudiente.component.css']
})
export class PerfilAcudienteComponent implements OnInit {
  personas: any;
  datos;


  constructor(
    private client: ClientService,
    public auth: AuthService,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {


      this.client.getRequestAllPersonas('http://localhost:5000/api/v01/user/datospersonas', localStorage.getItem('token')).subscribe(

        (data): any => {
          this.personas= data["data"]
          console.log(data)

        },
        (error) => {

          console.log(error);


        })



    }




}








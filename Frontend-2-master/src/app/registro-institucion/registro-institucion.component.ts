import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../client.service';

import Swal from 'sweetalert2/dist/sweetalert2.js';


@Component({
  selector: 'app-registro-institucion',
  templateUrl: './registro-institucion.component.html',
  styleUrls: ['./registro-institucion.component.css']
})
export class RegistroInstitucionComponent implements OnInit {
  form: FormGroup;
  load: boolean = true;
  submitted = false;


  constructor(
    private fb: FormBuilder,
    private route: Router,
    private client: ClientService
  ) { }


  ngOnInit(): void {

    this.form = this.fb.group({
      idinstitucion: ['', Validators.required],
      nombreInstitucion: ['', Validators.required],
      direccion: ['', Validators.required],
      comuna: ['', Validators.required],
      modalidad: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],

    });
  }

  get f() { return this.form.controls; }
  async onSubmit() {
    this.submitted = true;

    if (this.form.valid) {

      let data = {
        idinstitucion: this.form.value.idinstitucion,
        nombreInstitucion: this.form.value.nombreInstitucion,
        direccion: this.form.value.direccion,
        comuna: this.form.value.comuna,
        modalidad: this.form.value.modalidad,
        telefono: this.form.value.telefono,
        email: this.form.value.email,
        password: this.form.value.password,


      }

      this.load = false;
      this.client.postRequest('http://localhost:5000/api/v01/user/registroInstituciones', data).subscribe(

        (response: any) => {

          this.load = true;
          console.log(response);

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Registro de institucion exitoso',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
              this.route.navigate( ['/Login'])
          })

          console.log(response);
      },
      (error) => {

        console.log(error.status);

      })


    } else {

      console.log("Form error");
    }


  }

}

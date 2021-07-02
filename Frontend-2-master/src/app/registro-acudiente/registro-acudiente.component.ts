import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../client.service';

import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-registro-acudiente',
  templateUrl: './registro-acudiente.component.html',
  styleUrls: ['./registro-acudiente.component.css']
})
export class RegistroAcudienteComponent implements OnInit {

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
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      documento: ['', Validators.required],
      id: ['', Validators.required],
      direccion: ['', Validators.required],
      municipio: ['', Validators.required],
      ocupacion: ['', Validators.required],
      parentesco: ['', Validators.required],
      num1: ['', Validators.required],
      num2: ['', Validators.required],
      email: ['', [Validators.email]],
      password: ['', Validators.required],

    });
  }

  get f() { return this.form.controls; }
  async onSubmit() {
    this.submitted = true;

    if (this.form.valid) {

      let data = {
        nombres: this.form.value.nombres,
        apellidos: this.form.value.apellidos,
        documento: this.form.value.documento,
        id: this.form.value.id,
        direccion: this.form.value.direccion,
        municipio: this.form.value.municipio,
        ocupacion: this.form.value.ocupacion,
        parentesco: this.form.value.parentesco,
        num1: this.form.value.num1,
        num2: this.form.value.num2,
        email: this.form.value.email,
        password: this.form.value.password,

      }

      this.load = false;
      this.client.postRequest('http://localhost:5000/api/v01/user/registroacudiente', data).subscribe(

        (response: any) => {

          this.load = true;
          console.log(response);

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Registro exitoso',
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../client.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-agregar-cupos',
  templateUrl: './agregar-cupos.component.html',
  styleUrls: ['./agregar-cupos.component.css']
})
export class AgregarCuposComponent implements OnInit {
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
      grado: ['', Validators.required],
      cupos: ['', Validators.required],
      codigoInstitucion: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaCierre: ['', Validators.required],
      respuestaUsuario: ['', Validators.required],
    });
  }

  get f() { return this.form.controls; }
  async onSubmit() {
    this.submitted = true;

    if (this.form.valid) {

      let data = {
        grado: this.form.value.grado,
        cupos: this.form.value.cupos,
        codigoInstitucion: this.form.value.codigoInstitucion,
        fechaInicio: this.form.value.fechaInicio,
        fechaCierre: this.form.value.fechaCierre,
        respuestaUsuario: this.form.value.respuestaUsuario,
      }
      this.load = false;
      this.client.postRequest('http://localhost:5000/api/v01/user/agregarConvocatoria', data).subscribe(

        (response: any) => {

          this.load = true;
          console.log(response);

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'convocatoria gestionada',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
              this.route.navigate( ['/CuposOfertados'])
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

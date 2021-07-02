import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../client.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-registro-estudiante',
  templateUrl: './registro-estudiante.component.html',
  styleUrls: ['./registro-estudiante.component.css']
})
export class RegistroEstudianteComponent implements OnInit {
form: FormGroup;
load: boolean = true;
submitted = false;
   constructor(
    private fb: FormBuilder,
    private route: Router,
    private client: ClientService
  ) {}

  ngOnInit(): void {
      this.form = this.fb.group({
      primerNombre: ['', Validators.required],
      segundoNombre: [''],
      primerApellido: ['', Validators.required],
      segundoApellido: [''],
      tipoIdentificacion: ['', Validators.required],
      idEstudiante: ['', Validators.required],
      genero: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      municipioResidencia: ['', Validators.required],
      direccion: ['', Validators.required],
      razaEtnia: ['', Validators.required],
      estrato: ['', Validators.required],
      poblacionVulnerable: ['', Validators.required],
      telefono: ['', Validators.required],
      idAcudiente: ['', Validators.required],
      pdf: ['', Validators.required],

    });
  }
  upload(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      pdf: file
    });
    this.form.get('pdf').updateValueAndValidity()
  }
//hasta aquí funcionaba

get f() { return this.form.controls; }
//async SesionYaCerrada(){
//this.route.navigate( ['/Login']);
//}*

  async onSubmit() {
  this.submitted = true;

    if (this.form.valid) {

      var formData: any = new FormData();
      formData.append("primerNombre", this.form.get('primerNombre').value);
      formData.append("segundoNombre", this.form.get('segundoNombre').value);
      formData.append("primerApellido", this.form.get('primerApellido').value);
      formData.append("segundoApellido", this.form.get('segundoApellido').value);
      formData.append("tipoIdentificacion", this.form.get('tipoIdentificacion').value);
      formData.append("idEstudiante", this.form.get('idEstudiante').value);
      formData.append("genero", this.form.get('genero').value);
      formData.append("fechaNacimiento", this.form.get('fechaNacimiento').value);
      formData.append("municipioResidencia", this.form.get('municipioResidencia').value);
      formData.append("direccion", this.form.get('direccion').value);
      formData.append("razaEtnia", this.form.get('razaEtnia').value);
      formData.append("estrato", this.form.get('estrato').value);
      formData.append("poblacionVulnerable", this.form.get('poblacionVulnerable').value);
      formData.append("telefono", this.form.get('telefono').value);
      formData.append("idAcudiente", this.form.get('idAcudiente').value);
      formData.append("pdf", this.form.get('pdf').value);
    }
    console.log("esto:", this.form);
    console.log("segundo:", formData);

    this.load = false;
      this.client.postRequestSendForm('http://localhost:5000/api/v01/user/registroEstudiante', formData).subscribe(


        (response: any) => {

          this.load = true;
          console.log(response);

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Registro Estudiante exitoso',
            showConfirmButton: false,
            timer: 900
          }).then(() => {
              this.route.navigate( ['/PerfilAcudiente'])
          })

          console.log(response);
      },
      (error) => {

        console.log(error.status);

      })


    }
}



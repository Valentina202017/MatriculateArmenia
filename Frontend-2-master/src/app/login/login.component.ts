import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../client.service';
import { AuthService } from '../auth.service';

import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  load: boolean = true;

  constructor(
    private fb: FormBuilder,
    private client: ClientService,
    public auth: AuthService,
    private route: Router ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required],
  });
  }
  async onSubmit() {


    if (this.form.valid) {

      let data = {
        email: this.form.value.email,
        password: this.form.value.password,
      }

      this.load = false;
      this.client.postRequest('http://localhost:5000/api/v01/user/login', data).subscribe(

        (response: any) => {

          this.load = true;
          localStorage.setItem('tokenuser',response.token)

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Bienvenido, has ingresado',
            showConfirmButton: false,
            timer: 2000
          }).then(() => {
              this.route.navigate( ['/PerfilAcudiente'])
          })

          console.log(response);

          this.auth.login(response.token)

          this.auth.setCourrentUser(response.nombres)




          localStorage.setItem('token', response.token)
          console.log(localStorage.getItem('token'));

      },
      (error) => {

        console.log(error.status);

      })

    } else {

      console.log("Form error");
    }
  }



  async loginInstitucion(){

    if (this.form.valid) {

      let data = {
        email: this.form.value.email,
        password: this.form.value.password,
      }
      console.log("esto es el data de loginInstitucion",data)

      this.client.postRequest('http://localhost:5000/api/v01/user/loginIns', data).subscribe(

        (response: any) => {

          this.load = true;
          localStorage.setItem('tokenuser',response.token)

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Bienvenido, has ingresado',
            showConfirmButton: false,
            timer: 2000
          }).then(() => {
              this.route.navigate( ['/PerfilInstitucion'])
          })

          console.log(response);

          this.auth.login(response.token)

          this.auth.setCourrentUser(response.nombres)




          localStorage.setItem('token', response.token)
          console.log(localStorage.getItem('token'));

      },
      (error) => {

        console.log(error.status);

      })
    }
    

  }
}

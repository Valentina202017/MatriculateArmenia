import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // el BehaviorSubject que nos permitirá guardar el estado de login
  //tendrá un estado inicial booleano según lo que retorne checkToken
  isLogin = new BehaviorSubject<boolean>(this.checkToken());

  //el BehaviorSubject que nos permitirá saber si somos admin o no
  admin = new BehaviorSubject<boolean>(null);
  //user = new BehaviorSubject<boolean>(null);
  //guarda = new BehaviorSubject<boolean>(null);

  //método que nos permitirá chequear si existe un token, en tal
  //caso retornará true
  private checkToken() : boolean {
    return !!localStorage.getItem('token');
  }

  //método que nos permite establecer el token en el almacenamiento local
  //y enviar una señal del BehaviorSubject para establecer su nuevo valor en
  //true para indicar que estamos logueados
  login(token:string) : void {

    localStorage.setItem('token', token);
    this.admin.next(true);
    this.isLogin.next(true);
  }

  //método que nos permite establecer el nombre del usuario

  setCourrentUser(nombres:string) : void {
    localStorage.setItem('courrentUser', nombres);
  }

  //método que nos permite recuperar el nombre del usuario
  getCourrentUser() : string {
    return localStorage.getItem('courrentUser');
  }

  //método que nos permite eliminar el nombre de usuario
  private deleteCourrentUser() : void {
    localStorage.removeItem('courrentUser');
  }


  setCourrentapellidos(apellidos:string) : void {
    localStorage.setItem('courrentapellidos', apellidos);
  }

  //método que nos permite recuperar el nombre del usuario
  getCourrentapellidos() : string {
    return localStorage.getItem('courrentapellidos');
  }

  private deleteCourrentapellidos() : void {
    localStorage.removeItem('courrentapellidos');
  }


  setCourrentdocumento(documento:string) : void {
    localStorage.setItem('courrentdocumento', documento);
  }


  getCourrentdocumento() : string {
    return localStorage.getItem('courrentdocumento');
  }

  private deleteCourrentdocumento() : void {
    localStorage.removeItem('courrentdocumento');
  }

  setCourrentid(id:string) : void {
    localStorage.setItem('courrentdocumento', id);
  }

  getCourrentid() : string {
    return localStorage.getItem('courrentid');
  }


  private deleteCourrentid() : void {
    localStorage.removeItem('courrentid');
  }

  setCourrentdireccion(direccion:string) : void {
    localStorage.setItem('courrentdireccion', direccion);
  }

  //método que nos permite recuperar el nombre del usuario
  getCourrentdireccion() : string {
    return localStorage.getItem('courrentdireccion');
  }

  //método que nos permite eliminar el nombre de usuario
  private deleteCourrentdireccion() : void {
    localStorage.removeItem('courrentdireccion');
  }
  setCourrentmunicipio(municipio:string) : void {
    localStorage.setItem('courrentmunicipio', municipio);
  }

  //método que nos permite recuperar el nombre del usuario
  getCourrentmunicipio() : string {
    return localStorage.getItem('courrentmunicipio');
  }

  //método que nos permite eliminar el nombre de usuario
  private deleteCourrentmunicipio() : void {
    localStorage.removeItem('courrentmunicipio');
  }

  setCourrentocupacion(ocupacion:string) : void {
    localStorage.setItem('courrentocupacion', ocupacion);
  }

  //método que nos permite recuperar el nombre del usuario
  getCourrentocupacion() : string {
    return localStorage.getItem('courrentocupacion');
  }

  //método que nos permite eliminar el nombre de usuario
  private deleteCourrentocupacion() : void {
    localStorage.removeItem('courrentocupacion');
  }


  setCourrentparentesco(parentesco:string) : void {
    localStorage.setItem('courrentoparentesco', parentesco);
  }

  //método que nos permite recuperar el nombre del usuario
  getCourrentparentesco() : string {
    return localStorage.getItem('courrentparentesco');
  }

  //método que nos permite eliminar el nombre de usuario
  private deleteCourrentparentesco() : void {
    localStorage.removeItem('courrentparentesco');
  }

  setCourrentnum1(num1:string) : void {
    localStorage.setItem('courrentnum1', num1);
  }

  //método que nos permite recuperar el nombre del usuario
  getCourrentnum1() : string {
    return localStorage.getItem('courrentnum1');
  }

  //método que nos permite eliminar el nombre de usuario
  private deleteCourrentnum1() : void {
    localStorage.removeItem('courrentnum1');
  }

  setCourrentnum2(num2:string) : void {
    localStorage.setItem('courrentnum2', num2);
  }

  //método que nos permite recuperar el nombre del usuario
  getCourrentnum2() : string {
    return localStorage.getItem('courrentnum2');
  }

  //método que nos permite eliminar el nombre de usuario
  private deleteCourrentnum2() : void {
    localStorage.removeItem('courrentnum2');
  }


  setCourrentemail(email:string) : void {
    localStorage.setItem('courrentemail', email);
  }

  //método que nos permite recuperar el nombre del usuario
  getCourrentemail() : string {
    return localStorage.getItem('courrentemail');
  }

  //método que nos permite eliminar el nombre de usuario
  private deleteCourrentemail() : void {
    localStorage.removeItem('courrentemail');
  }


  //método que nos permite romover el token almacenado y el nombre del
  //usuario actual y enviar una señal al BehaviorSubject para establecer
  //su nuevo valor, en este caso false para indicar que no estamos logueados
  logout() : void {
    localStorage.removeItem('token');
    this.deleteCourrentUser();
    this.isLogin.next(false);
  }

  //método que nos retorna el BehaviorSubject cómo un observable
  isLoggedIn() : Observable<boolean> {
    return this.isLogin.asObservable();
   }

   /*
   isUser() : Observable<boolean> {
    return this.user.asObservable();
   }
*/

   //método que nos retorna el BehaviorSubject admin cómo un observable
  isAdmin() : Observable<boolean> {
    return this.admin.asObservable();
   }

}

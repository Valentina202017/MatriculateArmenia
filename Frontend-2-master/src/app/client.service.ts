
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  getRequest(route: string, token?: string) {

    let config: any = {
      responseType: "json"
    }

    if (token) {
      const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      config["headers"] = header;
    }
    console.log(config);

    return this.http.post(route, config)
  }

  postRequest(route: string, data?: any, token?: string) {
    let config: any = {
      responseType: "json"
    }

    if (token) {
      console.log("aca ingresa al if postrequest")
      const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      config["headers"] = header;

    }
    console.log("111----------ok",config);

    return this.http.post(route, data, config);
  }
 getRequestAllPersonas(route: string, token?: string) {

    let config: any = {
      responseType: "json"
    }

    if (token) {
      const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      config["headers"] = header;
    }
    console.log(config);

    return this.http.get(route, config)
  }

  getRequestMostrarInstituciones(route: string) {
    let config: any = {
    responseType: "json"
  }

  return this.http.get(route, config);
  }


  getRequestCuposInstitucion(route: string, id: String) {
    let config: any = {
    responseType: "json"
    }

    const params = new HttpParams().set('id', `${id}`);
    config["params"] = params;
    /*const header = new HttpHeaders().set('Authorization', '57ydf544ljka559ahjkfgd1');
    config["header"] = header;*/

  return this.http.get(route, config);
  }

  postRequestReservarCupo(route: string, data?: any) {
    let config: any = {
      responseType: "json"
    }

    return this.http.post(route, data, config);
  }

  postRequestSendForm(route: string, data?:any) {
    let config:any = {
      responseType: "json"
    }
    const header = new HttpHeaders().set('Authorization', '57ydf544ljka559ahjkfgd1');


    config["header"] = header;
    //Notese que como tercer parametro se pasa la configuracion de la request
    return this.http.post(route, data, config);
  }
}


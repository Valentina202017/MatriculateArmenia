import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ClientService } from './client.service';

@Injectable({
  providedIn: 'root'
})
export class InstitucionesService {

  institucion$ = new EventEmitter<Array<any>>();

  grados$ = new EventEmitter<Array<any>>();

  cupos$ = new EventEmitter<string>();

  /*cupos$ = new EventEmitter<Array<any>>();*/

  ideInstitucion$ = new EventEmitter<string>();

  constructor() { }
}

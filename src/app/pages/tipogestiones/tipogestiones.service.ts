import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from 'src/app/enviroments/enviroment';
import { Tipogestiones } from './tipoGestiones.interface';
const base_url = Environment.url;
@Injectable({
  providedIn: 'root'
})
export class TipogestionesService {
  constructor(
    private http:HttpClient
  ) { }
  getAll(desde:number = 0,hasta:number = 10): Observable<Tipogestiones[]>{
    return this.http.get<Tipogestiones[]>(`${base_url}/tipogestiones?limit=${hasta}&offset=${desde}`);
  }
  getById(id:number): Observable<Tipogestiones>{
    return this.http.get<Tipogestiones>(`${base_url}/tipogestiones/${id}`);
  }
}

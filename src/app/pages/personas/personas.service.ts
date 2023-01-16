import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from 'src/app/enviroments/enviroment';

const base_url = Environment.url;
@Injectable({
  providedIn: 'root'
})
export class PersonasService {
  
  constructor(private http:HttpClient) { }
  
  getPersonas(){
    return this.http.get(`${base_url}/deudores?limit=1000000000`);
  }
  buscarPersona(term: string){
    return this.http.get(`${base_url}/deudores/${term}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from 'src/app/enviroments/enviroment';
import { Personas } from './persona.interface';

const base_url = Environment.url;
@Injectable({
  providedIn: 'root'
})
export class PersonasService {
  
  constructor(private http:HttpClient) { }
  
  getPersonas(desde:number = 0,hasta:number = 10): Observable<Personas[]>{
    return this.http.get<Personas[]>(`${base_url}/deudores?limit=${hasta}&offset=${desde}`);
  }
  buscarPersona(term: string,desde:number = 0,hasta:number = 10): Observable<Personas[]>{
    return this.http.get<Personas[]>(`${base_url}/deudores/search/${term}?limit=${hasta}&offset=${desde}`);
  }
  agregarPersona(personas:Personas){
    personas.fullname = personas.apellidos+","+personas.nombres;
    return this.http.post(`${base_url}/deudores`,personas);
  }
  actualizarPersona(personas:Personas){
    let updatePersona = {
      nombres:personas.nombres,
      apellidos:personas.apellidos,
      cedula:personas.cedula,
      nacimiento:personas.nacimiento,
      fullname:personas.apellidos+","+personas.nombres
    }
    return this.http.patch(`${base_url}/deudores/${personas.id}`,updatePersona);
  }
  eliminarPersona(id:number){
    return this.http.delete(`${base_url}/deudores/${id}`);
  }
}

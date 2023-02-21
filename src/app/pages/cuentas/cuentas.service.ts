import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from 'src/app/enviroments/enviroment';
import { Cuentas } from './cuentas.interface';

const base_url = Environment.url;
@Injectable({
  providedIn: 'root'
})
export class CuentasService {
  constructor(
    private http:HttpClient
  ) { }

  getAll(desde:number = 0,hasta:number = 10){
    return this.http.get<Cuentas[]>(`${base_url}/cuentas?limit=${hasta}&offset=${desde}`);
  }
  getById(id:number){
    return this.http.get<Cuentas>(`${base_url}/cuentas/${id}`);
  }
  search(termino:string,desde:number = 0,hasta:number = 10){
    return this.http.get<Cuentas[]>(`${base_url}/cuentas/buscar/${termino}?limit=${hasta}&offset=${desde}`);
  }
  create(cuenta:Cuentas){
    return this.http.post<Cuentas>(`${base_url}/cuentas`,cuenta);
  }
  update(cuenta:Cuentas){
    let updateCuenta = {
      acreedor : cuenta.acreedor,
      concepto : cuenta.concepto,
      ddg : cuenta.ddg,
      ddm : cuenta.ddm,
      deudor : cuenta.deudor,
      fechaProximaGestion : cuenta.fechaProximaGestion,
      fechaUltimoPago : cuenta.fechaUltimoPago,
      gastosCobranza : cuenta.gastosCobranza,
      interesMoratorio : cuenta.interesMoratorio,
      interesPunitorio : cuenta.interesPunitorio,
      saldoCapital : cuenta.saldoCapital,
      tipoGestion : cuenta.tipoGestion,
      ultimoContacto : cuenta.ultimoContacto
    }
    return this.http.patch<Cuentas>(`${base_url}/cuentas/${cuenta.id}`,updateCuenta);
  }

  delete(cuenta:Cuentas){
    return this.http.delete<Cuentas>(`${base_url}/cuentas/${cuenta.id}`);
  }
}

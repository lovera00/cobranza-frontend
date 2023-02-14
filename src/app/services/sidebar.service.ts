import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
menu: any[] = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Dashboard', url: '/dashboard',icono: 'nav-icon fas fa-chart-line' },
        { titulo: 'Personas', url: '/deudores',icono: 'nav-icon fas fa-users' },
        { titulo: 'Tipo Gestion', url: '/tipogestiones',icono: 'nav-icon fas fa-users' },
      ]
    },
];
  constructor() { }
  
}

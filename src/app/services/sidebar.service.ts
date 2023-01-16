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
        { titulo: 'Dashboard', url: '/dashboard',icono: 'nav-icon fas fa-calendar-alt' },
        { titulo: 'Personas', url: '/deudores',icono: 'nav-icon fas fa-calendar-alt' },
      ]
    },
];
  constructor() { }
  
}

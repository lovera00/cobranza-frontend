import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from '../app-routing.module';
import { PersonasComponent } from './personas/personas.component';
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TipogestionesComponent } from './tipogestiones/tipogestiones.component';
import { CuentasComponent } from './cuentas/cuentas.component';



@NgModule({
  declarations: [DashboardComponent, PersonasComponent, TipogestionesComponent, CuentasComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    DataTablesModule
  ],
  exports: [DashboardComponent]
})
export class PagesModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from '../app-routing.module';
import { PersonasComponent } from './personas/personas.component';



@NgModule({
  declarations: [DashboardComponent, PersonasComponent],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [DashboardComponent]
})
export class PagesModule { }

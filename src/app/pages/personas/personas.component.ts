import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Personas } from './persona.interface';
import { PersonasService } from './personas.service';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css'],
})
export class PersonasComponent implements OnInit {
  personas: Personas[] = [];
  form: FormGroup = this.formBuilder.group({});
  addForm: FormGroup = this.formBuilder.group({});
  updateForm: FormGroup = this.formBuilder.group({});
  loading: boolean = false;
  mostrarVistaCrear = true;
  mostrarVistaActualizar = false;
  desde: number = 0;
  hasta: number = 5;
  constructor(
    private formBuilder: FormBuilder,
    private personasServices: PersonasService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.personas = [];
    this.listarPersonas();
    this.form = this.formBuilder.group({
      searchTerm: ['', Validators.required],
    });
    this.addForm = this.formBuilder.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      cedula: ['', Validators.required],
      nacimiento: ['', Validators.required],
    });
    this.updateForm = this.formBuilder.group({
      id:['',Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      cedula: ['', Validators.required],
      nacimiento: ['', Validators.required],
    });
  }
  listarPersonas() {
    this.loading = true;
    this.personas = [];
    this.personasServices
      .getAll(this.desde, this.hasta)
      .subscribe((personas: Personas[]) => {
        this.personas = personas;
        this.loading = false;
      });
  }
  previousPage() {
    if (!this.form.value.searchTerm) {
      if (this.desde <= 0) {
        this.desde = 0;
      } else {
        this.desde -= 5;
        this.listarPersonas();
      }
    } else {
      if (this.desde <= 0) {
        this.desde = 0;
      } else {
        this.desde -= 5;
        this.BuscarPorTermino();
      }
    }
  }
  nextPage() {
    if (!this.form.value.searchTerm) {
      this.desde += 5;
      this.listarPersonas();
    } else {
      if(this.personas.length >= 5){
        this.desde += 5;
        this.BuscarPorTermino();
      }      
    }
  }
  BuscarPorTermino() {
    this.desde = 0;
    this.hasta = 5;
    this.loading = true;
    this.personas = [];
    if (!this.form.value.searchTerm) {
      this.desde = 0;
      this.listarPersonas();
      return;
    }
    this.personasServices
      .findPersonaByTerm(this.form.value.searchTerm,this.desde,this.hasta)
      .subscribe((personas: Personas[]) => {
        this.personas = personas;
        this.loading = false;
      });
  }

  createDeudor(){
    this.personasServices.agregarPersona(this.addForm.value).subscribe((resp:any)=>{
      if(resp){
        alert("creado correctamente")
        this.addForm.reset();
        this.mostrarVistaActualizar = false;
        this.listarPersonas();
      }
    });
  }
  mostrarVistaActualizarDeudor(persona:Personas){
    this.mostrarVistaCrear = false;
    this.mostrarVistaActualizar = true;
    this.updateForm.setValue({
      id:persona.id,
      nombres:persona.nombres,
      apellidos:persona.apellidos,
      cedula:persona.cedula,
      nacimiento:persona.nacimiento
    });
  }
  updateDeudor(){
    this.personasServices.actualizarPersona(this.updateForm.value).subscribe((resp:any)=>{
      if(resp){
        alert("actualizado correctamente")
        this.updateForm.reset();
        this.mostrarVistaActualizar = false;
        this.mostrarVistaCrear = true;
        this.listarPersonas();
      }
    });
  }
  eliminarDeudor(persona:Personas){
    this.personasServices.eliminarPersona(persona.id).subscribe((resp:any)=>{
      if(resp){
        alert("eliminado correctamente")
        this.mostrarVistaActualizar = false;
        this.mostrarVistaCrear = true;
        this.listarPersonas();
      }
    });
  }
}

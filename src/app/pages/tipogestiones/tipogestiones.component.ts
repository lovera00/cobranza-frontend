import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tipogestiones } from './tipoGestiones.interface';
import { TipogestionesService } from './tipogestiones.service';

@Component({
  selector: 'app-tipogestiones',
  templateUrl: './tipogestiones.component.html',
  styleUrls: ['./tipogestiones.component.css']
})
export class TipogestionesComponent implements OnInit {
  constructor(
    private readonly tipoGestionesService:TipogestionesService,
    private formBuilder: FormBuilder
  ) { }

  desde: number = 0;
  hasta: number = 5;
  tipoGestion: Tipogestiones[] = [];
  addForm: FormGroup = this.formBuilder.group({});
  updateForm: FormGroup = this.formBuilder.group({});
  loading: boolean = false;
  mostrarVistaCrear = true;
  mostrarVistaActualizar = false;
  ngOnInit() {
    this.loading = true;
    this.listarTipoGestiones();
    this.addForm = this.formBuilder.group({
      descripcion: ['', Validators.required],
      status: ['',Validators.required]
    });
    this.updateForm = this.formBuilder.group({
      id:['',Validators.required],
      descripcion: ['', Validators.required],
      status: ['',Validators.required]
    });
  }
  previousPage() {
    if (this.desde <= 0) {
      this.desde = 0;
    } else {
      this.desde -= 5;
      this.listarTipoGestiones();
    }
  }
  nextPage() {
    this.desde += 5;
    this.listarTipoGestiones();
  }
  listarTipoGestiones() {
    this.tipoGestionesService.getAll(this.desde, this.hasta).subscribe(
      (data:Tipogestiones[])=>{
        this.tipoGestion = data;
        this.loading = false;
      }
    );
  }

}

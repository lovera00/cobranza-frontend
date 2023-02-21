import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cuentas } from './cuentas.interface';
import { CuentasService } from './cuentas.service';

@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.css'],
})
export class CuentasComponent implements OnInit {
  constructor(
    private readonly cuentasService: CuentasService,
    private formBuilder: FormBuilder
  ) {}
  desde: number = 0;
  hasta: number = 5;
  cuentas: Cuentas[] = [];
  form: FormGroup = this.formBuilder.group({});
  addForm: FormGroup = this.formBuilder.group({});
  updateForm: FormGroup = this.formBuilder.group({});
  loading: boolean = false;
  mostrarVistaCrear = true;
  mostrarVistaActualizar = false;
  ngOnInit(): void {
    this.loading = true;
    this.listarCuentas();
    this.form = this.formBuilder.group({
      searchTerm: ['', Validators.required],
    });
    this.addForm = this.formBuilder.group({
      acreedor: ['', Validators.required],
      concepto: ['', Validators.required],
      ddm: [null, Validators.required],
      ddg: [null, Validators.required],
      saldoCapital: [null, Validators.required],
      interesPunitorio: [null, Validators.required],
      interesMoratorio: [null, Validators.required],
      gastosCobranza: [null, Validators.required],
      fechaUltimoPago: [null, Validators.required],
      ultimoContacto: [null, Validators.required],
      fechaProximaGestion: [null, Validators.required],
      tipoGestion: ['', Validators.required],
      deudor: [null, Validators.required],
    });

    this.updateForm = this.formBuilder.group({
      id: ['', Validators.required],
      acreedor: ['', Validators.required],
      concepto: ['', Validators.required],
      ddm: [null, Validators.required],
      ddg: [null, Validators.required],
      saldoCapital: [null, Validators.required],
      interesPunitorio: [null, Validators.required],
      interesMoratorio: [null, Validators.required],
      gastosCobranza: [null, Validators.required],
      fechaUltimoPago: [null, Validators.required],
      ultimoContacto: [null, Validators.required],
      fechaProximaGestion: [null, Validators.required],
      tipoGestion: ['', Validators.required],
    });
  }

  previousPage() {
    if (this.desde <= 0) {
      this.desde = 0;
    } else {
      this.desde -= 5;
      this.listarCuentas();
    }
  }

  nextPage() {
    this.desde += 5;
    this.listarCuentas();
  }

  listarCuentas() {
    this.loading = true;
    this.cuentas = [];
    this.cuentasService
      .getAll(this.desde, this.hasta)
      .subscribe((data: Cuentas[]) => {
        this.cuentas = data;
        this.loading = false;
      });
  }

  buscarPorTermino() {
    this.desde = 0;
    this.hasta = 5;
    this.loading = true;
    this.cuentas = [];
    if (!this.form.value.searchTerm) {
      this.desde = 0;
      this.listarCuentas();
      return;
    }
    this.cuentasService
      .search(this.form.value.searchTerm, this.desde, this.hasta)
      .subscribe((data: Cuentas[]) => {
        this.cuentas = data;
        this.loading = false;
      });
  }

  crearCuenta() {
    this.cuentasService
      .create(this.addForm.value)
      .subscribe((data: Cuentas) => {
        this.addForm.reset();
        this.mostrarVistaCrear = true;
        this.mostrarVistaActualizar = false;
        this.listarCuentas();
      });
  }

  actualizarCuenta() {
    this.cuentasService
      .update(this.updateForm.value)
      .subscribe((data: Cuentas) => {
        this.updateForm.reset();
        this.mostrarVistaCrear = true;
        this.mostrarVistaActualizar = false;
        this.listarCuentas();
      });
  }

  eliminarCuenta(cuenta: Cuentas) {
    this.cuentasService
      .delete(cuenta)
      .subscribe((data: Cuentas) => {
        this.updateForm.reset();
        this.mostrarVistaCrear = true;
        this.mostrarVistaActualizar = false;
        this.listarCuentas();
      });
  }

  mostrarFormularioActualizar(cuenta: Cuentas) {
    console.log(cuenta);
    
    this.mostrarVistaCrear = false;
    this.mostrarVistaActualizar = true;
    this.updateForm.setValue({
      id: cuenta.id,
      acreedor: cuenta.acreedor,
      concepto: cuenta.concepto,
      ddm: cuenta.ddm,
      ddg: cuenta.ddg,
      saldoCapital: cuenta.saldoCapital,
      interesPunitorio: cuenta.interesPunitorio,
      interesMoratorio: cuenta.interesMoratorio,
      gastosCobranza: cuenta.gastosCobranza,
      fechaUltimoPago: cuenta.fechaUltimoPago,
      ultimoContacto: cuenta.ultimoContacto,
      fechaProximaGestion: cuenta.fechaProximaGestion,
      tipoGestion: cuenta.tipoGestion,
    });
  }
}

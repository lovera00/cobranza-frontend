import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { CuentasComponent } from './cuentas.component';
import { CuentasService } from './cuentas.service';

describe('CuentasComponent', () => {
  let component: CuentasComponent;
  let service:CuentasService;
  let fixture: ComponentFixture<CuentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuentasComponent ],
      providers: [CuentasService],
      imports: [HttpClientModule , AppRoutingModule , ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuentasComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(CuentasService);
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should decrease the value of "desde" by 5 when calling previousPage', () => {
    component.desde = 5;
    component.previousPage();
    expect(component.desde).toEqual(0);
  })

  it('should not decrease the value of "desde" if "desde" is already 0', () => {
    component.desde = 0;
    component.previousPage();
    expect(component.desde).toEqual(0);
  })

  it('should add the value of "desde" by 5 when calling nextPage', () => {
    component.desde = 0;
    component.nextPage();
    expect(component.desde).toEqual(5);
  })

  it('should call "listarCuentas" when "nextPage" is called', () => {
    spyOn(component, 'listarCuentas');
    component.nextPage();
    expect(component.listarCuentas).toHaveBeenCalled();
  })

  it('should call "listarCuentas" when "previousPage" is called', () => {
    component.desde = 5;
    spyOn(component, 'listarCuentas');
    component.previousPage();
    expect(component.listarCuentas).toHaveBeenCalled();
  })

  it('should call "listarCuentas" when "ngOnInit" is called', () => {
    spyOn(component, 'listarCuentas');
    component.ngOnInit();
    expect(component.listarCuentas).toHaveBeenCalled();
  })

  it('should call "getAll" when "listarCuentas" is called', () => {
    spyOn(service, 'getAll').and.callFake(() => {
      return new Observable();
    })
    component.listarCuentas();
    expect(service.getAll).toHaveBeenCalled();
  })

  it('should not call "listarCuentas" if "desde" is already 0', () => {
    component.desde = 0;
    spyOn(component, 'listarCuentas');
    component.previousPage();
    expect(component.listarCuentas).not.toHaveBeenCalled();
  });

  it('should call "listarCuentas" when "BuscarPorTermino" is not defined', () => {
    spyOn(component, 'listarCuentas');
    component.buscarPorTermino();
    expect(component.listarCuentas).toHaveBeenCalled();
  })

  it('should not call "listarCuentas" when "BuscarPorTermino" is defined', () => {
    component.form.controls['searchTerm'].setValue('test');
    spyOn(component, 'listarCuentas');
    component.buscarPorTermino();
    expect(component.listarCuentas).not.toHaveBeenCalled();
  })

  it('should call "create" when "crearCuenta" is called', () => {
    spyOn(service, 'create').and.callFake(() => {
      return new Observable();
    })
    component.crearCuenta();
    expect(service.create).toHaveBeenCalled();
  })

  it('should call "update" when "actualizarCuenta" is called', () => {
    spyOn(service, 'update').and.callFake(() => {
      return new Observable();
    })
    component.actualizarCuenta();
    expect(service.update).toHaveBeenCalled();
  })

  it('should call "delete" when "eliminarCuenta" is called', () => {
    spyOn(service, 'delete').and.callFake(() => {
      return new Observable();
    })
    component.eliminarCuenta();
    expect(service.delete).toHaveBeenCalled();
  })
});

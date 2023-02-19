import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { TipogestionesComponent } from './tipogestiones.component';
import { Estado, Tipogestiones } from './tipoGestiones.interface';
import { TipogestionesService } from './tipogestiones.service';

describe('TipogestionesComponent', () => {
  let component: TipogestionesComponent;
  let service : TipogestionesService;
  let fixture: ComponentFixture<TipogestionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipogestionesComponent ],
      imports: [HttpClientModule , AppRoutingModule , ReactiveFormsModule],
      providers: [TipogestionesService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipogestionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    service = TestBed.inject(TipogestionesService);
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
  });

  it('should add the value of "desde" by 5 when calling nextPage', () => {
    component.desde = 0;
    component.nextPage();
    expect(component.desde).toEqual(5);
  })

  it('should call "listarTipoGestiones" when "nextPage" is called', () => {
    spyOn(component, 'listarTipoGestiones');
    component.nextPage();
    expect(component.listarTipoGestiones).toHaveBeenCalled();
  });

  it('should call "listarTipoGestiones" when "previousPage" is called', () => {
    component.desde = 5;
    spyOn(component, 'listarTipoGestiones');
    component.previousPage();
    expect(component.listarTipoGestiones).toHaveBeenCalled();
  })

  it('sholud not call "listarTipoGestiones" where previus page is called and desde equal 0 or less',()=>{
    component.desde = 0;
    spyOn(component, 'listarTipoGestiones');
    component.previousPage();
    expect(component.listarTipoGestiones).not.toHaveBeenCalled();
  })
  it('should call "listarTipoGestiones" in the start up', () => {
    spyOn(component, 'listarTipoGestiones');
    component.ngOnInit();
    expect(component.listarTipoGestiones).toHaveBeenCalled();
  })

  it('should set tipoGestion and loading variables correctly when getAll() method of TipoGestionesService returns data', () => {
    const tipoGestiones:Tipogestiones[] = [
      {
        id:1,
        description:'Gestion 1',
        status:Estado.Activo
      },
      {
        id:2,
        description:'Gestion 2',
        status:Estado.Activo
      }
    ];

    spyOn(service, 'getAll').and.returnValue(
      new Observable<Tipogestiones[]>(subscriber => {
        subscriber.next(tipoGestiones);
      })
    );
    component.listarTipoGestiones();
    expect(component.loading).toBeFalse();
    expect(component.tipoGestion).toEqual(tipoGestiones);
  })

  it('should call "create" when "crearTipoGestion" is called',()=>{
    const tipoGestion:Tipogestiones = {
      id:1,
      description:'Gestion 1',
      status:Estado.Activo
    }
    spyOn(service, 'create').and.returnValue(
      new Observable<Tipogestiones>(subscriber => {
        subscriber.next(tipoGestion);
      })
    );
    component.crearTipoGestion();
    expect(service.create).toHaveBeenCalled();
  })

  it('should call "update" when "actualizarTipoGestion" is called',()=>{
    const tipoGestion:Tipogestiones = {
      id:1,
      description:'Gestion 1',
      status:Estado.Activo
    }
    spyOn(service, 'update').and.returnValue(
      new Observable<Tipogestiones>(subscriber => {
        subscriber.next(tipoGestion);
      })
    );
    component.actualizarTipoGestion();
    expect(service.update).toHaveBeenCalled();
  })

  it('should call "delete" when "eliminarTipoGestion" is called',()=>{
    const tipoGestion:Tipogestiones = {
      id:1,
      description:'Gestion 1',
      status:Estado.Activo
    }
    spyOn(service, 'delete').and.returnValue(
      new Observable<Tipogestiones>(subscriber => {
        subscriber.next(tipoGestion);
      })
    );
    component.eliminarTipoGestion(tipoGestion);
    expect(service.delete).toHaveBeenCalled();
  })

  it('should set tipoGestion and loading variables correctly when getAll() method of TipoGestionesService returns data', () => {
    const tipoGestion:Tipogestiones = {
      id:1,
      description:'Gestion 1',
      status:Estado.Activo
    }

    component.mostrarVistaCrear = true;
    component.mostrarVistaActualizar = false;
    component.updateForm.setValue({ 
      id: tipoGestion.id,
      description: tipoGestion.description,
      status: tipoGestion.status
     });
    component.mostrarVistaActualizarTipoGestion(tipoGestion);

    expect(component.mostrarVistaCrear).toBe(false);
    expect(component.mostrarVistaActualizar).toBe(true);
    expect(component.updateForm.value.description).toBe(tipoGestion.description);
    expect(component.updateForm.value.status).toBe(tipoGestion.status);
});

  
});

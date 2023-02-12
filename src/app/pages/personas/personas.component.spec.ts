import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { PersonasComponent } from './personas.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { PersonasService } from './personas.service';
import { Personas } from './persona.interface';

describe('PersonasComponent', () => {
  let component: PersonasComponent;
  let fixture: ComponentFixture<PersonasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonasComponent ],
      imports: [HttpClientModule , AppRoutingModule , ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should decrease the value of "desde" by 5 when calling previousPage', () => {
    component.desde = 5;
    component.previousPage();
    expect(component.desde).toEqual(0);
  });
  it('should not decrease the value of "desde" if "desde" is already 0', () => {
    component.desde = 0;
    component.previousPage();
    expect(component.desde).toEqual(0);
  });
  it('should call "listarPersonas" when "BuscarPorTermino" is not defined', () => {
    spyOn(component, 'listarPersonas');
    component.form.setValue({ searchTerm: '' });
    component.BuscarPorTermino();
    expect(component.listarPersonas).toHaveBeenCalled();
  });
  it('should call "buscarPersona" when "searchTerm" is defined', () => {
    spyOn(component, 'BuscarPorTermino');
    component.form.setValue({ searchTerm: 'test' });
    component.BuscarPorTermino();
    expect(component.BuscarPorTermino).toHaveBeenCalledWith();
  });
  it('should call "listarPersonas" when "nextPage" is called', () => {
    spyOn(component, 'listarPersonas');
    component.nextPage();
    expect(component.listarPersonas).toHaveBeenCalled();
  });
  it('should increase the value of "desde" by 5 when calling "nextPage"', () => {
    component.desde = 0;
    component.nextPage();
    expect(component.desde).toEqual(5);
  });

  it('should call "listarPersonas" when "previousPage" is called', () => {
    component.desde = 5;
    spyOn(component, 'listarPersonas');
    component.previousPage();
    expect(component.listarPersonas).toHaveBeenCalled();
  });

  it('You should not call "buscarPersona" when the number of records is 5 or less and there is a non-empty search term.', () => {
    component.form.setValue({ searchTerm: 'test' });
    component.personas = [];
    spyOn(component, 'BuscarPorTermino');
    component.nextPage();
    expect(component.BuscarPorTermino).not.toHaveBeenCalled();
  });

  it('should not call "buscarPersona" when "previousPage" is called and "desde" is 0 or less', () => {
    component.desde = 0;
    spyOn(component, 'BuscarPorTermino');
    component.previousPage();
    expect(component.BuscarPorTermino).not.toHaveBeenCalled();
  });  
  it('should not call "listarPersonas" when "previousPage" is called and "desde" is 0 or less', () => {
    component.desde = 0;
    component.form.setValue({ searchTerm: 'test' });
    spyOn(component, 'listarPersonas');
    component.previousPage();
    expect(component.listarPersonas).not.toHaveBeenCalled();
  });  
  
});

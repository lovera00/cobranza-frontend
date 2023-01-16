import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonasService } from './personas.service';
import { DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements  OnInit, OnDestroy  {
  form: FormGroup = this.formBuilder.group({});
  personas: any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  
  constructor(private formBuilder: FormBuilder, private personasServices: PersonasService) { }
 
  ngOnInit() {
    this.form = this.formBuilder.group({
      searchTerm: ['', Validators.required]
    });
    this.dtOptionsConfig();

    this.personasServices.getPersonas().subscribe((resp: any) => {
      this.personas = resp;
      this.dtTrigger.next(null);
    });
  }

  dtOptionsConfig() {
    this.dtOptions =  {
      pagingType: 'full_numbers',
      pageLength: 10,
      columns: [
        { data: 'id' },
        { data: 'nombres' },
        { data: 'direccion' },
        { data: 'correo' },
        { data: 'telefono' },
        { data: 'userDateInsert' }
      ]
    };
  }


  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  onSubmit() {
    if (this.form.valid) {
      this.personasServices.buscarPersona(this.form.value.searchTerm).subscribe((resp: any) => {
        this.personas = resp;
        this.dtTrigger.unsubscribe();
        this.dtTrigger.next(null);
      });
    }
  }

  refresh() {
    this.personasServices.getPersonas().subscribe((resp: any) => {
      this.personas = resp;
      this.dtTrigger.unsubscribe();
      this.dtTrigger.next(null);
    });
  }
}

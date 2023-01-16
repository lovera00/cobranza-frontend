import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonasService } from './personas.service';


@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {
  form: FormGroup = this.formBuilder.group({});
  personas: any[] = [];

  constructor(private formBuilder: FormBuilder,
    private personasServices: PersonasService) { }
    dtOptions: DataTables.Settings = {};
 
  ngOnInit() {
    
    this.form = this.formBuilder.group({
      searchTerm: ['', Validators.required]
    });
    this.personasServices.getPersonas().subscribe((resp: any) => {
      this.personas = resp;
    }
    );
  }

  onSubmit() {
    if (this.form.valid) {
      this.personasServices.buscarPersona(this.form.value.searchTerm).subscribe((resp: any) => {
        this.personas = resp;
      });
    }else{
      this.personasServices.getPersonas().subscribe((resp: any) => {
        this.personas = resp;
      }
      );
    }
  }
}
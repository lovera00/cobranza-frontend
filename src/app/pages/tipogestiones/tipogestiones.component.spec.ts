import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipogestionesComponent } from './tipogestiones.component';

describe('TipogestionesComponent', () => {
  let component: TipogestionesComponent;
  let fixture: ComponentFixture<TipogestionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipogestionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipogestionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

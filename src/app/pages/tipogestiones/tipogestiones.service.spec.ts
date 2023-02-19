import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TipogestionesService } from './tipogestiones.service';
import { Environment } from 'src/app/enviroments/enviroment';
import { Estado, Tipogestiones } from './tipoGestiones.interface';
describe('TipogestionesService', () => {
  let service: TipogestionesService;
  let httpMock: HttpTestingController;
  const base_url = Environment.url;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TipogestionesService]
    });
    service = TestBed.inject(TipogestionesService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterAll(()=>{
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getTipogestiones', () => {
    it('should return an array of tipogestiones', () => {
      const dummyTipogestiones: Tipogestiones[] = [
        {
          id: 1,
          description: 'Llamada exitosa',
          status: Estado.Inactivo
        },
        {
          id: 2,
          description: 'Llamada fallida',
          status: Estado.Activo
        }
      ];

      service.getAll().subscribe(tipogestiones => {
        expect(tipogestiones.length).toBe(2);
        expect(tipogestiones).toEqual(dummyTipogestiones);
      });

      const req = httpMock.expectOne(`${base_url}/tipo-gestion?limit=10&offset=0`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyTipogestiones);
    });

    it('should return an array of tipogestiones', () => {
      const dummyTipogestiones: Tipogestiones[] = [
        {
          id: 1,
          description: 'Llamada exitosa',
          status: Estado.Inactivo
        }
      ];

      service.getAll().subscribe(tipogestiones => {
        expect(tipogestiones.length).toBe(1);
        expect(tipogestiones).toEqual(dummyTipogestiones);
      });

      const req = httpMock.expectOne(`${base_url}/tipo-gestion?limit=10&offset=0`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyTipogestiones);
    });
  })

  describe('find by id',()=>{
    it('should return a tipogestion',()=>{
      const dummyTipogestion: Tipogestiones = {
        id: 1,
        description: 'Llamada exitosa',
        status: Estado.Inactivo
      };

      service.getById(1).subscribe(tipogestion => {
        expect(tipogestion).toEqual(dummyTipogestion);
      });

      const req = httpMock.expectOne(`${base_url}/tipo-gestion/1`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyTipogestion);
    })
  })

  describe('create',()=>{
    it('should return a tipogestion',()=>{
      const dummyTipogestion: Tipogestiones = {
        id: 1,
        description: 'Llamada exitosa',
        status: Estado.Inactivo
      };

      service.create(dummyTipogestion).subscribe(tipogestion => {
        expect(tipogestion).toEqual(dummyTipogestion);
      });

      const req = httpMock.expectOne(`${base_url}/tipo-gestion`);
      expect(req.request.method).toBe('POST');
      req.flush(dummyTipogestion);
    })
  });

  describe('update',()=>{
    it('should return a tipogestion',()=>{
      const dummyTipogestion: Tipogestiones = {
        id: 1,
        description: 'Llamada exitosa',
        status: Estado.Inactivo
      };

      service.update(dummyTipogestion).subscribe(tipogestion => {
        expect(tipogestion).toEqual(dummyTipogestion);
      });

      const req = httpMock.expectOne(`${base_url}/tipo-gestion/1`);
      expect(req.request.method).toBe('PATCH');
      req.flush(dummyTipogestion);
    })
  })

  describe('delete',()=>{
    it('should return a tipogestion',()=>{
      const dummyTipogestion: Tipogestiones = {
        id: 1,
        description: 'Llamada exitosa',
        status: Estado.Inactivo
      };

      service.delete(dummyTipogestion).subscribe(tipogestion => {
        expect(tipogestion).toEqual(dummyTipogestion);
      });

      const req = httpMock.expectOne(`${base_url}/tipo-gestion/1`);
      expect(req.request.method).toBe('DELETE');
      req.flush(dummyTipogestion);
    })
  })
});

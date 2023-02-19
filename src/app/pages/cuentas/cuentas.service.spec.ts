import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CuentasService } from './cuentas.service';
import { Environment } from 'src/app/enviroments/enviroment';
import { Cuentas } from './cuentas.interface';

describe('CuentasService', () => {
  let service: CuentasService;
  let httpMock: HttpTestingController;
  const base_url = Environment.url;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CuentasService]
    });
    service = TestBed.inject(CuentasService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterAll(()=>{
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCuentas', () => {
    it('should return an array of cuentas', () => {
      const dummyCuentas:Cuentas[] = [
        {
          id:1,
          acreedor:'',
          concepto:'',
          ddg:1,
          ddm:1,
          deudor:1,
          fechaProximaGestion:new Date,
          fechaUltimoPago:new Date,
          gastosCobranza:1,
          interesMoratorio:1,
          interesPunitorio:1,
          saldoCapital:1,
          tipoGestion:1,
          ultimoContacto:new Date
        },
        {
          id:2,
          acreedor:'',
          concepto:'',
          ddg:1,
          ddm:1,
          deudor:1,
          fechaProximaGestion:new Date,
          fechaUltimoPago:new Date,
          gastosCobranza:1,
          interesMoratorio:1,
          interesPunitorio:1,
          saldoCapital:1,
          tipoGestion:1,
          ultimoContacto:new Date
        }
      ];

      service.getAll().subscribe(cuentasResp => {
        expect(cuentasResp.length).toBe(2);
        expect(cuentasResp).toEqual(dummyCuentas);
      });

      const req = httpMock.expectOne(`${base_url}/cuentas?limit=10&offset=0`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyCuentas);
    });
  })

  describe('getCuentasById', () => {
    it('should return an array of cuentas', () => {
      const dummyCuentas:Cuentas = {
          id:1,
          acreedor:'',
          concepto:'',
          ddg:1,
          ddm:1,
          deudor:1,
          fechaProximaGestion:new Date,
          fechaUltimoPago:new Date,
          gastosCobranza:1,
          interesMoratorio:1,
          interesPunitorio:1,
          saldoCapital:1,
          tipoGestion:1,
          ultimoContacto:new Date
        };

      service.getById(1).subscribe(cuentasResp => {
        expect(cuentasResp).toEqual(dummyCuentas);
      });

      const req = httpMock.expectOne(`${base_url}/cuentas/1`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyCuentas);
    });
  })

  describe('createCuentas', () => {
    it('should return an array of cuentas', () => {
      const dummyCuentas:Cuentas = {
          id:1,
          acreedor:'',
          concepto:'',
          ddg:1,
          ddm:1,
          deudor:1,
          fechaProximaGestion:new Date,
          fechaUltimoPago:new Date,
          gastosCobranza:1,
          interesMoratorio:1,
          interesPunitorio:1,
          saldoCapital:1,
          tipoGestion:1,
          ultimoContacto:new Date
        };

      service.create(dummyCuentas).subscribe(cuentasResp => {
        expect(cuentasResp).toEqual(dummyCuentas);
      });

      const req = httpMock.expectOne(`${base_url}/cuentas`);
      expect(req.request.method).toBe('POST');
      req.flush(dummyCuentas);
    });
  })

  describe('updateCuentas', () => {
    it('should return an array of cuentas', () => {
      const dummyCuentas:Cuentas = {
          id:1,
          acreedor:'',
          concepto:'',
          ddg:1,
          ddm:1,
          deudor:1,
          fechaProximaGestion:new Date,
          fechaUltimoPago:new Date,
          gastosCobranza:1,
          interesMoratorio:1,
          interesPunitorio:1,
          saldoCapital:1,
          tipoGestion:1,
          ultimoContacto:new Date
        };

      service.update(dummyCuentas).subscribe(cuentasResp => {
        expect(cuentasResp).toEqual(dummyCuentas);
      });

      const req = httpMock.expectOne(`${base_url}/cuentas/1`);
      expect(req.request.method).toBe('PUT');
      req.flush(dummyCuentas);
    });
  })

  describe('deleteCuentas', () => {
    it('should return an array of cuentas', () => {
      const dummyCuentas:Cuentas = {
          id:1,
          acreedor:'',
          concepto:'',
          ddg:1,
          ddm:1,
          deudor:1,
          fechaProximaGestion:new Date,
          fechaUltimoPago:new Date,
          gastosCobranza:1,
          interesMoratorio:1,
          interesPunitorio:1,
          saldoCapital:1,
          tipoGestion:1,
          ultimoContacto:new Date
        };

      service.delete(dummyCuentas).subscribe(cuentasResp => {
        expect(cuentasResp).toEqual(dummyCuentas);
      });

      const req = httpMock.expectOne(`${base_url}/cuentas/1`);
      expect(req.request.method).toBe('DELETE');
      req.flush(dummyCuentas);
    });
  })
});

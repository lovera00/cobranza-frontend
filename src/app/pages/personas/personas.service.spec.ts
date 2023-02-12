import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PersonasService } from './personas.service';
import { Personas } from './persona.interface';
import { Environment } from 'src/app/enviroments/enviroment';
describe('PersonasService', () => {
  let service: PersonasService;
  let httpMock: HttpTestingController;
  const base_url = Environment.url;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PersonasService]
    });

    service = TestBed.inject(PersonasService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getPersonas', () => {
    it('should return an array of personas', () => {
      const dummyPersonas: Personas[] = [
        {
          id: 1,
          nombres: 'John',
          apellidos: 'Doe',
          cedula: '1234567890',
          nacimiento: '01/01/2000',
          fullname: 'Doe, John'
        },
        {
          id: 2,
          nombres: 'Jane',
          apellidos: 'Doe',
          cedula: '0987654321',
          nacimiento: '01/01/2000',
          fullname: 'Doe, Jane'
        }
      ];

      service.getAll().subscribe(personas => {
        expect(personas.length).toBe(2);
        expect(personas).toEqual(dummyPersonas);
      });

      const req = httpMock.expectOne(`${base_url}/deudores?limit=10&offset=0`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyPersonas);
    });
  });

  describe('buscarPersona', () => {
    it('should return an array of Personas when the search term is found', (done) => {
      const searchTerm = 'John';
      const expectedPersonas = [    { id: 1, nombres: 'John', apellidos: 'Doe', cedula: '1234567890', nacimiento: '01/01/2000', fullname: 'Doe,John' },    { id: 2, nombres: 'Jane', apellidos: 'Doe', cedula: '2345678901', nacimiento: '02/01/2000', fullname: 'Doe,Jane' }  ];
    
      service.findPersonaByTerm(searchTerm).subscribe(personas => {
        expect(personas).toEqual(expectedPersonas);
        done();
      });
    
      const req = httpMock.expectOne(`${base_url}/deudores/search/${searchTerm}?limit=10&offset=0`);
      expect(req.request.method).toBe('GET');
      req.flush(expectedPersonas);
    });
    
    it('should return an empty array if no results are found', (done) => {
      const searchTerm = 'Unknown';
    
      service.findPersonaByTerm(searchTerm).subscribe(personas => {
        expect(personas).toEqual([]);
        done();
      });
    
      const req = httpMock.expectOne(`${base_url}/deudores/search/${searchTerm}?limit=10&offset=0`);
      expect(req.request.method).toBe('GET');
      req.flush([]);
    });

    it('should return an empty array if the search term is empty', (done) => {
      const searchTerm = '';
    
      service.findPersonaByTerm(searchTerm).subscribe(personas => {
        expect(personas).toEqual([]);
        done();
      });
    
      const req = httpMock.expectOne(`${base_url}/deudores/search/${searchTerm}?limit=10&offset=0`);
      expect(req.request.method).toBe('GET');
      req.flush([]);
    })
  })
});
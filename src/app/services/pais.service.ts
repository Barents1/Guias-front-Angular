import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  constructor(private http: HttpClient) { }

  getPaises() {
    return this.http.get<Pais[]>('https://restcountries.com/v3.1/lang/spanish')
      .pipe(
        map((paises: Pais[]) => paises.map(pais => {
          return {
            nombre: pais.name.common, // Acceder al nombre común del país
            codigo: pais.cca3
          };
        }))
      );
  }
}

interface Pais {
  name: {
    common: string;
  };
  cca3: string;
}

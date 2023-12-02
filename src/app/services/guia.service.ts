import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Interfaces
import { GuiaInterface } from 'src/app/interfaces/interfaces';
import { GuiaModel } from '../models/guia.model';

@Injectable({
  providedIn: 'root'
})
export class GuiaService {
  private apiUrl = 'http://localhost:8000/api/guias';
  constructor(private http:HttpClient) { }

  // method asyncto validate if exist guia number
  existeGuia(control: FormControl): Promise<ErrorValidate | null> {
    // verificar si el valor recien cargado
    if (!control.value) {
      return Promise.resolve(null);
    }

    return new Promise((resolve, reject) => {
      this.getGuias().subscribe(guias => {
        const guiaExiste = guias.some(guia => guia.numero_guia === control.value);
        if (guiaExiste) {
          resolve({ existe: true });
        } else {
          resolve(null);
        }
      }, error => {
        // Maneja cualquier error de la petición aquí
        reject(error);
      });
    });
  }
  
  getGuias(): Observable<GuiaInterface[]> {
    return this.http.get<GuiaInterface[]>(this.apiUrl)
  }

  postGuia(datosGuia:GuiaModel){
    return this.http.post(this.apiUrl, datosGuia).pipe(
      map( (resp:any) => {
        datosGuia.guia_id = resp.guia_id;
        return resp;
      })
    );
  }

  getById(guia_id:number){
    return this.http.get(`${this.apiUrl}/${guia_id}`);
  }

  updateGuia(guia_id:number, datosGuia:GuiaModel): Observable<any>{
    return this.http.put(`${this.apiUrl}/${guia_id}`, datosGuia);
  }

  deleteGuia(guia_id:number){
    return this.http.delete(`${this.apiUrl}/${guia_id}`);
  }
  
}


interface ErrorValidate{
  [s:string]: boolean
}
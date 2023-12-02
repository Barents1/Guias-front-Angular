import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagoModel } from '../models/pago.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  private apiUrl = 'http://localhost:8000/api/pagos/'

  constructor( private http:HttpClient) { }

  getPagoById(id:number){
    return this.http.get(`${this.apiUrl}${id}`);
  }

  postPago(datosPago:PagoModel){
    return this.http.post(`${this.apiUrl}`, datosPago).pipe(
      map( (resp:any) => {

        datosPago.pago_id = resp.pago_id;
        return resp;
      })
    );
  }

  updatePago(pago_id:number, datosPago:PagoModel): Observable<any>{
    return this.http.put(`${this.apiUrl}${pago_id}`, datosPago);
  }

  getPagos(): Observable<any>{
    return this.http.get(`${this.apiUrl}/`);
  }
  deletePago(pago_id:number){
    return this.http.delete(`${this.apiUrl}${pago_id}`);
  }
}

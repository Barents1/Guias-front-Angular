import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { FacturaModel } from '../models/factura.model';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private apiUrl = 'http://localhost:8000/api/factura'
  constructor( private http:HttpClient) { }

  getFacturaById(id:number){
    return this.http.get(`${this.apiUrl}s/${id}`);
  }

  getFacturas(): Observable<any>{
    return this.http.get(`${this.apiUrl}s/`);
  }

  countFacturas(){
    return this.http.get(`${this.apiUrl}/count`);
  }

  postFactura(datosFactura:FacturaModel){
    return this.http.post(`${this.apiUrl}s`, datosFactura).pipe(
      map( (resp:any) => {
        datosFactura.factura_id = resp.factura_id;
        return resp;
      })
    );
  }

  deleteFactura(factura_id:number){
    return this.http.delete(`${this.apiUrl}s/${factura_id}`);
  }

  updateFactura(factura_id:number, datosFactura:FacturaModel): Observable<any>{
    return this.http.put(`${this.apiUrl}s/${factura_id}`, datosFactura);
  }
  
  getCalcularTotal(guiasSeleccionadas: number[]) {
    return this.http.post('http://localhost:8000/api/factura/costo/', { guias_ids: guiasSeleccionadas });
  }
  
}



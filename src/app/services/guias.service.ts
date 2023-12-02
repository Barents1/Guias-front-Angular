import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Interfaces
import { GuiaInterface } from 'src/app/interfaces/interfaces';


@Injectable({
  providedIn: 'root'
})
export class GuiasService {

  private apiUrl = 'http://localhost:8000/api/buscar';

  constructor(private http:HttpClient) { }


  getGuias(texto: string): Observable<GuiaInterface[]> {
    return this.http.get<GuiaInterface[]>(`${this.apiUrl}/${texto}`)
  }
  
}

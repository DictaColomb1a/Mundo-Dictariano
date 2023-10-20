import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { SistemaPlanetario } from '../models/sistema-planetario.model';

@Injectable({
  providedIn: 'root'
})
export class SistemaPlanetarioService {
  private baseUrl = 'https://mundo-dictariano-api.onrender.com/sistema-planetario';

  constructor(private httpClient: HttpClient) { }

  getByGalaxia(galaxiaId: String): Observable<SistemaPlanetario> {
    return this.httpClient.get<SistemaPlanetario>(`${this.baseUrl}/galaxia/${galaxiaId}`);
  }
}

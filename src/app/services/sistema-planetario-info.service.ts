import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { SistemaPlanetarioInfo } from '../models/sistema-planetario-info.model';

@Injectable({
  providedIn: 'root'
})
export class SistemaPlanetarioInfoService {
  private baseUrl = 'https://mundo-dictariano-api.onrender.com/sistema-planetario-info';

  constructor(private httpClient: HttpClient) { }

  getBySistemaPlanetarioAndCategoriaUsuario(sistemaPlanetarioId: String, categoriaUsuarioId: string): Observable<SistemaPlanetarioInfo> {
    return this.httpClient.get<SistemaPlanetarioInfo>(`${this.baseUrl}/sistema-planetario-categoria-usuario/${sistemaPlanetarioId}/${categoriaUsuarioId}`);
  }
}

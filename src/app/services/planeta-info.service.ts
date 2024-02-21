import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { PlanetaInfo } from '../models/planeta-info.model';

@Injectable({
  providedIn: 'root'
})
export class PlanetaInfoService {
  private baseUrl = 'https://mundo-dictariano-api.onrender.com/planeta-info';

  constructor(private httpClient: HttpClient) { }

  getByPlanetaAndCategoriaUsuario(planetaId: string, categoriaUsuario: string): Observable<PlanetaInfo> {
    return this.httpClient.get<PlanetaInfo>(`${this.baseUrl}/planeta-categoria-usuario/${planetaId}/${categoriaUsuario}`);
  }
}

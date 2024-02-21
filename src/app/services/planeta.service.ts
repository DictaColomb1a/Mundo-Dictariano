import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Planeta } from '../models/planeta.model';

@Injectable({
  providedIn: 'root'
})
export class PlanetaService {
  private baseUrl = 'https://mundo-dictariano-api.onrender.com/planeta';

  constructor(private httpClient: HttpClient) { }

  getBySistemaPlanetario(sistemaPlanetarioId: string): Observable<Planeta[]> {
    return this.httpClient.get<Planeta[]>(`${this.baseUrl}/sistema-planetario/${sistemaPlanetarioId}`);
  }
}

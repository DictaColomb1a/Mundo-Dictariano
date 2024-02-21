import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Galaxia } from '../models/galaxia.model';

@Injectable({
  providedIn: 'root'
})
export class GalaxiaService {
  private baseUrl = 'https://mundo-dictariano-api.onrender.com/galaxia';

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Galaxia[]> {
    return this.httpClient.get<Galaxia[]>(`${this.baseUrl}/`);
  }
}

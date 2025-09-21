import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

    private http = inject(HttpClient);


  constructor() { }

  getListaClientes(): Observable<any[]> {
  return this.http.get<any[]>(environment.apiUrl +"getListaClientes");
} 


}

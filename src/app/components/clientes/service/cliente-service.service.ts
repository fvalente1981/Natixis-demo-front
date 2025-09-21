import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

    private http = inject(HttpClient);
  constructor() { }

  getListaClientes(): Observable<any[]> {
    return this.http.get<any[]>(environment.apiUrl +"getListaClientes");
}

saveCliente(cliente: any): Observable<any> {
  return this.http.post<any>(environment.apiUrl + "saveCliente", cliente);
}

deleteCliente(cliente: any): Observable<any> {
  return this.http.post<any>(environment.apiUrl + "deleteCliente", cliente);
}

}

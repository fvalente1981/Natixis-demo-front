import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ApiService} from './services/api.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone:false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'Natixis-demo';
  private apiService = inject(ApiService);
  public clientes:any =[];
  private sub?: Subscription;
  constructor(){ 

 }

 ngOnInit(): void {
 this.sub =this.apiService.getListaClientes().subscribe({
    next: (listaClientes) => {
      this.clientes = listaClientes  
       
    },
    error: (err) => console.error('Erro:', err),
  });

     console.log(" this.clientes",  this.clientes);
 }

 
ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  refresh(){
    this.sub =this.apiService.getListaClientes().subscribe({
    next: (listaClientes) => {
      this.clientes = listaClientes  
       
    },
    error: (err) => console.error('Erro:', err),
  });

     console.log(" this.clientes",  this.clientes);
  }

}

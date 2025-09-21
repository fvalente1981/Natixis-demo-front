import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ClienteService } from './service/cliente-service.service';

@Component({
  selector: 'app-clientes',
  standalone: false,
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.scss'
})
export class ClientesComponent implements OnInit {

  public _clientes: any;
  public show: boolean = false;
  public enderecos: any = [{}];
  public add: boolean = false;
  public addBt: boolean = true;
  public close: boolean = true;
  public rua: string = '';
  public codigoPostal: string = '';
  public complemento: string = '';
  public conselho: string = '';
  public distrito: string = '';
  public cliente: any;
  public message: string = '';
  public showAlert: boolean = false;
  public color: any;
  public numero: any;
  public nome: string = '';
  public dataNasc: string = '';
  public nif: number = 0;
  public insert: boolean = false;
  public newCliente: any = { nome: null, dataNasc: null, nif: 0 };
  public maiorDeIdade: boolean = false;


  newEnderecos: Array<{
    id: number | null;
    rua: string;
    numero: string;
    codigoPostal?: string | null;
    complemento?: string | null;
    conselho?: string | null;
    distrito?: string | null;
  }> = [];


  @Output() save = new EventEmitter<boolean>();

  private clienteService = inject(ClienteService);

  @Input()
  set clientes(value: any) {
    this._clientes = value;
  }

  get clientes(): any {
    return this._clientes;
  }

  constructor() {

  }

  ngOnInit(): void {
    console.log("_clientes", this._clientes);

  }

  selectedCliente(c: any) {

    this.show = true;

    if (c.id != null) {
      this.newCliente.nif = 0;
      this.newCliente.nome = null;
      this.newCliente.dataNasc = null;
      this.enderecos = c.enderecos;
      this.cliente = c;
      this.insert = false;
      this.add = false;
      this.addBt = true;
      this.close = true;
      return;
    }

    this.enderecos = [];
    this.newEnderecos = [];
    this.cliente.enderecos = [];

  }

  showFunction() {
    this.show = false;
  }

  addFunction() {
    this.add = !this.add;
    this.addBt = false;
    this.close = false;

  }

  addCancel() {
    this.add = false;
    this.addBt = true;
    this.close = true;
  }

  saveFunction() {

    if (this.rua != "" && this.numero != "" && this.codigoPostal != "" && this.complemento != "" && this.conselho != "" && this.distrito != "") {

      if (this.insert) {

        if (this.newCliente.nome == null || this.newCliente.dataNasc == null || this.newCliente.nif == 0) {
          this.showAlert = true;
          this.color = '#8f9610ff';
          this.message = "Nome, Data Nascimento e Nif são campos obrigatórios! "
          this.newEnderecos = [];
          let time = setTimeout(() => {
            this.showAlert = false;
            clearTimeout(time);
          }, 2500)
          return;
        }
        (this.newEnderecos ??= []).push({
          id: null,
          rua: this.rua.trim(),
          numero: String(this.numero).trim(),
          codigoPostal: this.codigoPostal || null,
          complemento: this.complemento || null,
          conselho: this.conselho || null,
          distrito: this.distrito || null
        });
      } else {

        this.enderecos.push({
          id: null, rua: this.rua, numero: this.numero, codigoPostal: this.codigoPostal, complemento: this.complemento
          , conselho: this.conselho, distrito: this.distrito
        })
      }

      this.saveService(this.cliente);

    } else {
      this.showAlert = true;
      this.color = '#8f9610ff';
      this.message = "Todos campos de endereço são obrigatórios!"
      let time = setTimeout(() => {
        this.showAlert = false;
        clearTimeout(time);
      }, 2000)
    }

  }

  deleteFunction(id: number) {

    if (this.enderecos.length > 1) {
      for (let i = 0; i < this.enderecos.length; i++) {
        if (this.enderecos[i].id == id) {
          this.enderecos.splice(i, 1)
          this.cliente.enderecos = this.enderecos;
          this.message = "Item eliminado com sucesso!"
          this.saveService(this.cliente, true);
        }
      }
    } else {
      this.showAlert = true;
      this.color = '#8f9610ff';
      this.message = "Obrigatório ter um Endereço!"
      let time = setTimeout(() => {
        this.showAlert = false;
        clearTimeout(time);
      }, 2000)
    }
  }

  deleteclienteFunction(cliente: any) {


    this.message = "Item eliminado com sucesso!"
    this.clienteService.deleteCliente(cliente).subscribe({
      next: cliente => {
        this.addBt = true;
        this.close = true;
        this.save.emit(true);
        this.cliente = cliente
        this.showAlert = true;
        this.color = '#009900';
        let time = setTimeout(() => {
          this.showAlert = false;
          clearTimeout(time);
        }, 2500)

      },
      error: (err) => console.error('Erro:', err),
    });

  }


  saveService(cliente: any, del: boolean = false) {
    if (this.insert) {
      if (!this.newCliente.dataNasc) {
        this.newCliente.dataNasc = Date.now();
        this.enderecos = [];
        this.newEnderecos = [];
        this.cliente.enderecos = [];
      }
      cliente = this.newCliente
      cliente.dataNasc = new Date(this.newCliente.dataNasc);
      cliente.enderecos = this.newEnderecos;

    }
    this.calendar(cliente.dataNasc)
    if (this.maiorDeIdade) {
      this.insert = false;
      this.rua = "";
      this.codigoPostal = "";
      this.complemento = "";
      this.distrito = "";
      this.conselho = "";
      this.numero = "";
      this.nome = "";
      this.nif = 0;

      this.dataNasc = "";
      this.message = "Item adicionado com sucesso!"
      this.add = false;
      this.clienteService.saveCliente(cliente).subscribe({
        next: cliente => {

          if (this.insert) {
            this.show = false;
          }
          this.addBt = true;
          this.close = true;
          this.save.emit(true);
          this.cliente = cliente
          this.showAlert = true;
          this.color = '#009900';
          if (!del) {
            this.show = false;
          }
          this.newCliente.nif = 0;
          this.newCliente.nome = null;
          this.newCliente.dataNasc = null;
          let time = setTimeout(() => {
            this.showAlert = false;
            clearTimeout(time);
          }, 2500)

        },
        error: (err) => console.error('Erro:', err),
      });

    } else {
      this.enderecos = [];
      this.newEnderecos = [];
      this.cliente.enderecos = [];
    }
  }


  inserting() {
    this.insert = true;
    this.show = false;
    this.cliente = [];
    this.newCliente.nif = 0;
    this.newCliente.nome = null;
    this.newCliente.dataNasc = null;
    this.enderecos = [];
    this.newEnderecos = [];
  }


  calendar(date: string) {


    let idade = this.calcularIdade(date);
    if (idade < 18) {
      this.showAlert = true;
      this.color = '#8f9610ff';
      this.message = "Obrigatório ter 18 anos o mais!"
      this.enderecos = [];
      this.newEnderecos = [];
      this.cliente.enderecos = [];
      let time = setTimeout(() => {
        this.showAlert = false;
        clearTimeout(time);
        this.maiorDeIdade = false;
      }, 2000)
    } else {
      this.maiorDeIdade = true;
    }
  }

  calcularIdade(dataNasc: string | Date): number {
    const nascimento = new Date(dataNasc);
    const hoje = new Date();
    return hoje.getFullYear() - nascimento.getFullYear();
  }



}



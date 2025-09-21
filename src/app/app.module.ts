
import { NgModule} from '@angular/core';
import { AppComponent } from './app.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from "./components/clientes/mensagem/alert/alert.component";  
import { ClienteService } from './components/clientes/service/cliente-service.service';

@NgModule({
  declarations: [AppComponent, ClientesComponent],
  imports: [BrowserModule, RouterModule, FormsModule, AlertComponent],
  providers: [ ClienteService,
    provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
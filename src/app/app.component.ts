import { Component } from '@angular/core';
import { CuentaAtrasService } from './services/cuenta-atras.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';
  constructor(private cuentaAtras:CuentaAtrasService){
    if(!this.cuentaAtras.getReloj()){
      this.cuentaAtras.Relojito();
      console.log("relojito construido")

    }else{
      console.log("el reloj ya estaba hecho");
    }
  }
}

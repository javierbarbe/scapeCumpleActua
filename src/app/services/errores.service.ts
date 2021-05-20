import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErroresService {

  constructor() {

   }
   private cantidadErrores:number=0;
   private errorNuevo:boolean=false;
   addError(){
     this.errorNuevo=true;
     this.cantidadErrores++;
   }
   quitaError(){
     this.errorNuevo=false;
   }
   getHayError(){
     return this.errorNuevo;
   }
   getCantidadErrores(){
     return this.cantidadErrores;
   }
}

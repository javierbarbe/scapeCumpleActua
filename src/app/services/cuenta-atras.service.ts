import { ErroresService } from './errores.service';
import { Subject } from 'rxjs';
import { IReloj } from './../models/reloj';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CuentaAtrasService {
d:any;
  constructor(private errorS: ErroresService) {
    // this.reloj$.subscribe(resultado=> {
    //   this.reloj= resultado
    // })
  }


private reloj:IReloj;
private reloj$: Subject <IReloj>= new Subject();
cronometro;
 tempoCaido;
 milisecundero;

   Relojito=()=>{
     var errores2 =[];
     this.d = document;
     this.cuentaAtras('secundero','minutero','milisecundero','10 mayo 2022',errores2);
  //
  //    var errores= ['uno','dos','tres errores','sds'];
  //    var errores2 =[]
  //  this.cronometro=  setTimeout(() => {
  //     this.cuentaAtras('secundero','minutero','milisecundero','10 mayo 2022',errores2);

  //    }, 200);
    // this.d.addEventListener('DOMContentLoaded',()=>{
    // })
  }

  cancelarTimeOut=()=>{
     clearInterval(this.tempoCaido);
     clearInterval(this.cronometro);
     clearInterval(this.milisecundero);
     console.log("se ha cancelado this tempoCaido",this.tempoCaido);
     console.log("se ha candelado this.milisecundero", this.milisecundero);
  }

  iniciado:boolean=false;
dias:number=0;
horas:string='00';
minutos:string='60';
milisegundos:string;
segundos:string='00';
imagenMinion:string='';
numeroMin;

   cuentaAtras =(idSegundos:string,idMinutos:string,idMilisecundero:string,fechaLimitePasada:any , errores?:Array<string> ):IReloj=>{
     this.d.addEventListener('DOMContentLoaded', ()=>{
      let elementoSecundero = this.d.getElementById(idSegundos);
      let fechaLimite = new Date(fechaLimitePasada).getTime();
      let elementoMilisecundero = this.d.getElementById(idMilisecundero);
      let elementoMinutero= this.d.getElementById(idMinutos);

  console.log('en la cuenta ATRAS');
  if(!this.iniciado){
    this.milisecundero= setInterval(()=>{
      let ahora= new Date(Date.now()).getTime();
      let tiempoRestante=fechaLimite-ahora;
      // console.log(tiempoRestante);
      this.milisegundos=('0'+Math.floor(tiempoRestante% ((1000*60*60*24)))).slice(-3);
    //  elementoMilisecundero.innerHTML=`${this.milisegundos}`;
    this.reloj= {
      hora: this.horas,
      minuto:this.minutos,
      segundo: this.segundos,
      milisegundo: this.milisegundos,
      imagenMinion:this.imagenMinion
    };
    this.reloj$.next(this.reloj);

    },300);
    console.log('this.milisecundero es', this.milisecundero);
    console.log(typeof this.milisecundero);
  }
     })


     let fechaLimite = new Date(fechaLimitePasada).getTime();

        this.tempoCaido =setInterval(() => {
          let ahora= new Date(Date.now()).getTime();
          let tiempoRestante=fechaLimite-ahora;




          this.numeroMin= parseInt(this.minutos);
          const cantidadErrores=  this.errorS.getCantidadErrores();
          this.numeroMin=this.numeroMin-cantidadErrores;
          console.log(this.numeroMin)
          if(this.numeroMin<=10){
            this.minutos='00';
            this.segundos='00';
            this.milisegundos='000';
           this.cancelarTimeOut();
            // this.intervalSubs.unsubscribe();

          }else{
            // this.minuto=('0'+this.numeroMin).slice(-2);
            // this.segundo=this.reloj.segundo;
            // this.milisegundo= this.reloj.milisegundo;




          console.log('fecha limite en milisegundos',fechaLimite);
          this.dias= Math.floor(tiempoRestante/ (1000*60*60*24));
          this.horas= ('0'+Math.floor(tiempoRestante% ((1000*60*60*24))/(1000*60*60))).slice(-2);
          if(errores.length>0){
          this.minutos =('0'+Math.floor(tiempoRestante% ((1000*60*60))/(1000*60)-errores.length)).slice(-2);
          }else{
            this.minutos =('0'+Math.floor(tiempoRestante% ((1000*60*60))/(1000*60))).slice(-2);
          }
          this.segundos = ('0'+Math.floor(tiempoRestante% ((1000*60))/(1000))).slice(-2);



          if (this.minutos<'42'){
            this.imagenMinion='../assets/minionmorado.jpg';
            console.log("el tiempo pasa...");
          }else{
            console.log("el tiempo pasa...")
            this.imagenMinion='';
          }
          if(this.segundos<'40' && this.minutos<'42'){
            console.log("menos de 40 segundos y 42 min");
            // elementoSecundero.innerHTML+=`<img src='../assets/minionmorado.jpg' width=40 height=40 alt='no se encuentra'>`
          }
         }
         console.log("los minutos actuales", this.minutos);

          this.reloj= {
            hora: this.horas,
            minuto:this.minutos,
            segundo: this.segundos,
            milisegundo: this.milisegundos,

          };

          // console.log(this.reloj)
          this.reloj$.next(this.reloj);
        }, 1000);
        this.iniciado=true;
        console.log('he cambiado this iniciado a ',this.iniciado);
return this.reloj;
  }
getMinutos=()=>{
  setTimeout(() => {
    let ahora= new Date(Date.now()).getTime();
    let fechaLimite = new Date('20 jun 2021').getTime();
    let tiempoRestante=fechaLimite-ahora;
    this.minutos =('0'+Math.floor(tiempoRestante% ((1000*60*60))/(1000*60))).slice(-2);
  }, 1000);

return this.minutos;
}
getSegundos=()=>{
  return this.segundos;
}

getMiliSegundos=()=>{
return this.milisegundos;
}

getReloj =() =>{
return this.reloj;
}

getReloj$=()=>{
  return this.reloj$;
}
getIniciado=()=>{
  return this.iniciado;
}

}

import { Component, OnInit } from '@angular/core';
import { PagoModel } from 'src/app/models/pago.model';
import { PagoService } from 'src/app/services/pago.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit{

  pagos:PagoModel[]=[];
  cargando = false;

  constructor( private pagosService:PagoService,
              private location:Location){}

  ngOnInit(): void {
    this.cargando = true;
    this.pagosService.getPagos().subscribe((pagos:any) =>{
      console.log(pagos.data);
      
      this.pagos = pagos;
      this.cargando = false
    })
  }


  EliminarFactura( pago:PagoModel, i:number){

    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea eliminar la factura ${pago.pago_id}`,
      icon: 'success',
      showConfirmButton:true,
      showCancelButton:true
    }).then( resp => {
      if (resp.value) {
        this.pagos.splice(i, 1)
        this.pagosService.deletePago(pago.pago_id).subscribe();
      }
    })
    
  }

  volverAtras(): void {
    this.location.back(); // Método para volver a la página anterior
  }


}

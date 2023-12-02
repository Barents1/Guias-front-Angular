import { Component, OnInit } from '@angular/core';
import { FacturaModel } from 'src/app/models/factura.model';
import { FacturaService } from '../../services/factura.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit{

  facturas:FacturaModel[]=[];
  cargando = false;

  constructor( private facturasService:FacturaService,
              private location:Location){}

  ngOnInit(): void {
    this.cargando = true;
    this.facturasService.getFacturas().subscribe((facturas:any) =>{
      console.log(facturas.data);
      
      this.facturas = facturas.data;
      this.cargando = false
    })
  }


  EliminarFactura( factura:FacturaModel, i:number){

    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea eliminar la factura ${factura.factura_id}`,
      icon: 'success',
      showConfirmButton:true,
      showCancelButton:true
    }).then( resp => {
      if (resp.value) {
        this.facturas.splice(i, 1)
        this.facturasService.deleteFactura(factura.factura_id).subscribe();
      }
    })
    
  }

  volverAtras(): void {
    this.location.back(); // Método para volver a la página anterior
  }


}

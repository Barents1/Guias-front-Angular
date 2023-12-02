import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FacturaService } from '../../services/factura.service';
import { Location } from '@angular/common';
import { FacturaModel } from 'src/app/models/factura.model';

@Component({
  selector: 'app-facturadetalle',
  templateUrl: './facturadetalle.component.html',
  styleUrls: ['./facturadetalle.component.css']
})
export class FacturadetalleComponent implements OnInit {

  public id = '';
  public factura:any;
  public valor:string = '';

  constructor ( private activatedRouter: ActivatedRoute,
                private facturaService: FacturaService,
                private location: Location){
  }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe( (params:any) => {
      const facturaId = +params['id'];
        this.facturaService.getFacturaById(facturaId).subscribe((factura) =>{
          console.log(factura);
          
          this.factura = factura;
        })
    })
  }

  volverAtras(): void {
    this.location.back(); // Método para volver a la página anterior
  }

}

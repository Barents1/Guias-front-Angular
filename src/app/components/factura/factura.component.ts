import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FacturaService } from '../../services/factura.service';
import { FacturaModel } from 'src/app/models/factura.model';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {

  public totalFacturas = 0;
  public ultimasfacturas:FacturaModel[]=[];
  constructor( private activatedRouter:ActivatedRoute,
              private facturaService:FacturaService){}

  ngOnInit(): void {
    this.activatedRouter.params.subscribe( (params:any) => {
        this.facturaService.countFacturas().subscribe((factura:any) =>{
          console.log(factura);
          
          this.totalFacturas = factura.data;
        })
    });


    this.activatedRouter.params.subscribe((paprams:any) =>{
      this.facturaService.getFacturas().subscribe((facturas:any) =>{
        console.log(facturas.data);
        
        this.ultimasfacturas = facturas.data;
      })
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GuiasService } from '../../services/guias.service';
import { GuiasModel } from 'src/app/models/guias.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  public texto = '';
  public guias: GuiasModel[] =[];

  constructor( private activatedRoute:ActivatedRoute,
              private guiaService:GuiasService,
              private location:Location ){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( (params:any) => {
      this.texto = params.texto;
      // get services
      this.guiaService.getGuias(params.texto).subscribe((guias:any) => {
        console.log(guias);
        this.guias = guias;
        
      })
      
    })
  }

  volverAtras(): void {
    this.location.back(); // Método para volver a la página anterior
  }


}

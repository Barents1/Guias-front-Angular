import { Component, OnInit } from '@angular/core';
import { GuiaModel } from 'src/app/models/guia.model';

//Services
import { GuiaService } from 'src/app/services/guia.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-guias',
  templateUrl: './guias.component.html',
  styleUrls: ['./guias.component.css']
})
export class GuiasComponent  implements OnInit{

  guias: GuiaModel[] = [];
  cargando = false;

  constructor(private guiasService: GuiaService){}

  ngOnInit(){

    this.cargando = true;
    this.guiasService.getGuias().subscribe((resp:any) => {
      console.log(resp);
      
      this.guias = resp;
      this.cargando = false;
      
    });
  }

  EliminarGuia( guia:GuiaModel, i:number){

    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea eliminar la guía ${guia.numero_guia}`,
      icon: 'question',
      showConfirmButton:true,
      showCancelButton:true
    }).then( resp => {
      if (resp.value) {
        this.guias.splice(i, 1)
        this.guiasService.deleteGuia(guia.guia_id).subscribe();
      }
    })
    
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.css']
})
export class SharedComponent implements OnInit {


  constructor(private router:Router){}


  ngOnInit(): void {
    
  }


  buscarGuia(texto:string){
  
    texto = texto.trim();

    if(texto.length === 0){
      return;
    }

    this.router.navigate(['/buscar', texto]);
    
  }


}

import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FacturaModel } from 'src/app/models/factura.model';
import { FacturaService } from '../../services/factura.service';
import { ActivatedRoute } from '@angular/router';
import { PagoModel } from 'src/app/models/pago.model';
import { PagoService } from '../../services/pago.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-realizarpagos',
  templateUrl: './realizarpagos.component.html',
  styleUrls: ['./realizarpagos.component.css']
})
export class RealizarpagosComponent implements OnInit{
  
  forma!: FormGroup;
  facturas:FacturaModel[] = [];
  pago:PagoModel = new PagoModel();
  MostrarBotonVerPago = false;
  idPagoGuardado:number | null= null;

   constructor(
              private fb:FormBuilder,
              private facturasService:FacturaService,
              private pagoService:PagoService,
              private location:Location,
              private route:ActivatedRoute
   ){
    this.crearFormulario();
   }

  ngOnInit(): void {
    // get all Facturas
    this.facturasService.getFacturas().subscribe((facturas:any) =>{
      console.log(facturas.data);
      
      this.facturas = facturas.data;
    });

    //obtenemos el valor de la url
    const id: any = this.route.snapshot.paramMap.get('pago_id');

    //Comprobamos si no es un valor nuevo
    if (id !== 'nuevo') {
      //consultamos con el id enviado
      this.pagoService.getPagoById(id).subscribe((resp: any) => {
        this.pago.pago_id = resp.pago_id;
        this.forma.patchValue({
          tipo_pago: resp.tipo_pago,
          valor: resp.valor,
          fk_factura_id: resp.fk_factura_id,
        });
        // Reactivar el validador asíncrono
      });
    }
  }


  // validación de formularios
  crearFormulario() {
    this.forma = this.fb.group({
      fk_factura_id: ['', [Validators.required]],
      tipo_pago: ['', [Validators.required]],
      valor: ['', [Validators.required, Validators.maxLength(100), Validators.pattern('^\\d{1,16}(\\.\\d{1,2})?$')]]
    });
  }

  get facturaNoValido() {
    return (
      this.forma.get('fk_factura_id')?.invalid &&
      this.forma.get('fk_factura_id')?.touched
    );
  }
  get tipoNoValido() {
    return (
      this.forma.get('tipo_pago')?.invalid &&
      this.forma.get('tipo_pago')?.touched
    );
  }
  get valorNoValido() {
    return (
      this.forma.get('valor')?.invalid &&
      this.forma.get('valor')?.touched
    );
  }


  // método para pagar
  guardar() {
    console.log(this.forma);
    if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach((control) => {
        control.markAllAsTouched();
      });
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando Información',
      icon: 'info',
      allowOutsideClick: false,
    });
    Swal.showLoading();

    // Obtener datos del formulario
    const datosFormulario = this.forma.value;


    const manejarRespuesta = (titulo:string, texto:string, icono:any) => {
      Swal.fire({
          title: titulo,
          text: texto,
          icon: icono,
      });
  };

    if (this.pago.pago_id) {
      // Enviar los datos al servicio para guardar en la base de datos
      this.pagoService
        .updatePago(this.pago.pago_id, datosFormulario)
        .subscribe(
          (respuesta) => {
            console.log('Datos Actualizados:', respuesta);
            Swal.fire({
              title: datosFormulario.pago_id,
              text: 'Datos actualizados con éxito',
              icon: 'success',
            });
            this.MostrarBotonVerPago = true;
            this.idPagoGuardado = respuesta.data.pago_id;
          },
          (error) => {
            manejarRespuesta('Error al Actualizar', error.error.error, 'error');
          }
        );
    } else {
      //Enviar los datos al servicio para guardar en la base de datos
      this.pagoService.postPago(datosFormulario).subscribe(
        (respuesta) => {
          console.log('Datos guardados:', respuesta);
          this.pago = respuesta.data;
          Swal.fire({
            title: datosFormulario.pago_id,
            text: respuesta.message,
            icon: 'question',
            showConfirmButton:true,
            showCancelButton:true
          });
          this.MostrarBotonVerPago = true;
          this.idPagoGuardado = respuesta.data.pago_id;
        },
        (error) => {
          console.log('El error:', error.error.error);

          Swal.fire({
            title: datosFormulario.pago_id,
            text: error.error.error,
            icon: 'error',
          });
        }
      );
      // Posteo de informacion
      this.forma.reset({
        fk_factura_id: 'Seleccione una factura',
      });
      console.log(this.MostrarBotonVerPago, this.idPagoGuardado );
      
    }
  }

  // to botton reverse
  // Método para volver a la página anterior
  volverAtras(): void {
    this.location.back();
  }
}

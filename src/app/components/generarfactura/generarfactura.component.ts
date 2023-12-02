import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GuiaModel } from 'src/app/models/guia.model';
import { FacturaService } from '../../services/factura.service';
import { GuiaService } from 'src/app/services/guia.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { FacturaModel } from 'src/app/models/factura.model';

@Component({
  selector: 'app-generarfactura',
  templateUrl: './generarfactura.component.html',
  styleUrls: ['./generarfactura.component.css'],
})
export class GenerarfacturaComponent implements OnInit {
  forma!: FormGroup;
  factura: FacturaModel = new FacturaModel();
  guias: GuiaModel[] = [];
  mostrarBotonVerFactura = false;
  idFacturaGuardada: number | null = null;

  constructor(
    private fb: FormBuilder,
    private facturaService: FacturaService,
    private guiasService: GuiaService,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.guiasService.getGuias().subscribe((resp: any) => {
      console.log(resp);

      this.guias = resp;
    });

    //obtenemos el valor de la url
    const id: any = this.route.snapshot.paramMap.get('factura_id');

    //Comprobamos si no es un valor nuevo
    if (id !== 'nuevo') {
      //consultamos con el id enviado
      this.facturaService.getFacturaById(id).subscribe((resp: any) => {
        this.factura.factura_id = resp.factura_id;
        this.forma.patchValue({
          factura_id: resp.factura_id,
          establecimiento: resp.establecimiento,
          punto_emision: resp.punto_emision,
          secuencial: resp.secuencial,
          fecha_emision: new Date(resp.fecha_emision),
          sub_total: resp.sub_total,
          impuesto: resp.impuesto,
          total: resp.total,
        });
        // Reactivar el validador asíncrono
      });
    }
  }

  // validación de formularios
  crearFormulario() {
    this.forma = this.fb.group({
      establecimiento: ['', [Validators.required, Validators.maxLength(100)]],
      punto_emision: ['', [Validators.required, Validators.maxLength(100)]],
      secuencial: [
        '',
        [Validators.maxLength(100), Validators.pattern('^[0-9]+$')],
      ],
      fecha_emision: ['', [Validators.required, Validators.maxLength(100)]],
      sub_total: ['', [Validators.required, Validators.maxLength(100)]],
      impuesto: ['', [Validators.required, Validators.maxLength(50)]],
      total: [
        '',
        [Validators.required, Validators.pattern('^\\d{1,16}(\\.\\d{1,2})?$')],
      ],
      guias_ids: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }

  get establecimientoNoValido() {
    return (
      this.forma.get('establecimiento')?.invalid &&
      this.forma.get('establecimiento')?.touched
    );
  }
  get puntoEnisionNoValido() {
    return (
      this.forma.get('punto_emision')?.invalid &&
      this.forma.get('punto_emision')?.touched
    );
  }
  get secuencialNoValido() {
    return (
      this.forma.get('secuencial')?.invalid &&
      this.forma.get('secuencial')?.touched
    );
  }
  get fechaNoValido() {
    return (
      this.forma.get('fecha_emision')?.invalid &&
      this.forma.get('fecha_emision')?.touched
    );
  }
  get subTotalNoValido() {
    return (
      this.forma.get('sub_total')?.invalid &&
      this.forma.get('sub_total')?.touched
    );
  }
  get impuestoNoValido() {
    return (
      this.forma.get('impuesto')?.invalid &&
      this.forma.get('impuesto')?.touched
    );
  }
  get totalNoValido() {
    return  this.forma.get('total')?.invalid &&
    this.forma.get('total')?.touched
  }
  get guiasNoValido() {
    return (
      this.forma.get('guias_ids')?.invalid &&
      this.forma.get('guias_ids')?.touched
    );
  }

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
    // Formatear la fecha
    if (datosFormulario.fecha_emision) {
      datosFormulario.fecha_emision = this.formatearFecha(
        datosFormulario.fecha_emision
      );
    }

    if (this.factura.factura_id) {
      // Enviar los datos al servicio para guardar en la base de datos
      this.facturaService
        .updateFactura(this.factura.factura_id, datosFormulario)
        .subscribe(
          (respuesta) => {
            console.log('Datos Actualizados:', respuesta);
            Swal.fire({
              title: datosFormulario.numero_guia,
              text: 'Datos actualizados con éxito',
              icon: 'success',
            });
            this.mostrarBotonVerFactura = true;
            this.idFacturaGuardada = respuesta.factura.factura_id;
          },
          (error) => {
            console.error('Error al guardar:', error);
            // Manejar el error
          }
        );
    } else {
      //Enviar los datos al servicio para guardar en la base de datos
      this.facturaService.postFactura(datosFormulario).subscribe(
        (respuesta) => {
          console.log('Datos guardados:', respuesta);
          this.factura = respuesta.factura;
          Swal.fire({
            title: datosFormulario.numero_guia,
            text: respuesta.message,
            icon: 'success',
          });
          this.mostrarBotonVerFactura = true;
          this.idFacturaGuardada = respuesta.factura.factura_id;
        },
        (error) => {
          console.log('El error:', error.error.error);

          Swal.fire({
            title: datosFormulario.numero_guia,
            text: error.error.error,
            icon: 'error',
          });
        }
      );
      // Posteo de informacion
      this.forma.reset({
        pais_origen: 'Seleccione un país',
        pais_destino: 'Seleccione un país',
      });
      console.log(this.mostrarBotonVerFactura, this.idFacturaGuardada );
      
    }
  }

  // Método para volver a la página anterior
  volverAtras(): void {
    this.location.back();
  }

  formatearFecha(fecha: Date): string {
    const year = fecha.getFullYear();
    const month = fecha.getMonth() + 1; // Los meses en JavaScript comienzan desde 0
    const day = fecha.getDate();
    const hours = fecha.getHours();
    const minutes = fecha.getMinutes();
    const seconds = fecha.getSeconds();

    return `${year}-${month.toString().padStart(2, '0')}-${day
      .toString()
      .padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  calcularCosto() {
    const guiasSeleccionadas = this.forma.value.guias_ids;
  
    this.facturaService.getCalcularTotal(guiasSeleccionadas).subscribe(
      (costo:any) => {
        console.log('Costo calculado:', costo);
        // Asumiendo que la estructura de la respuesta es { data: { subtotal, impuesto, total } }
        this.forma.patchValue({
          sub_total: costo.data.subtotal,
          impuesto: costo.data.impuesto,
          total: costo.data.total,
        });
      },
      error => {
        console.error('Error al calcular el costo:', error);
        // Manejar errores aquí
      }
    );
  }
}

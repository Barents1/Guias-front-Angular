import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

import { PaisService } from '../../services/pais.service';
import { GuiaService } from '../../services/guia.service';
import { GuiaModel } from 'src/app/models/guia.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-guia',
  templateUrl: './guia.component.html',
  styleUrls: ['./guia.component.css'],
})
export class GuiaComponent implements OnInit {
  forma!: FormGroup;
  paises: any[] = [];

  guia = new GuiaModel();

  constructor(
    private fb: FormBuilder,
    private paisService: PaisService,
    private validadores: GuiaService,
    private GuiaService: GuiaService,
    private route: ActivatedRoute
  ) {
    this.crearFormulario();
    this.cargarDataAlFormulario();
  }

  ngOnInit(): void {
    this.paisService.getPaises().subscribe((paises) => {
      this.paises = paises;
      this.paises.unshift({
        nombre: 'Seleccione un país',
        codigo: '',
      });
      // console.log(paises);
    });

    const id:any = this.route.snapshot.paramMap.get('guia_id')
    
    //Comprobamos si no es un valor nuevo
    if (id !== 'nuevo') {
      //consultamos con el id enviado
      this.GuiaService.getById(id).subscribe((resp:any) => {

        // Desactivar temporalmente el validador asíncrono
        const numeroGuiaControl = this.forma.get('numero_guia');
        // comprobamos si existe ese validador
        if (numeroGuiaControl) {
          numeroGuiaControl.clearAsyncValidators();
          this.guia.guia_id = resp.data.guia_id;
          this.forma.patchValue({
            numero_guia: resp.data.numero_guia,
            fecha_envio: new Date(resp.data.fecha_envio), // Asegúrate de convertir la fecha a un objeto Date si es necesario
            pais_origen: resp.data.pais_origen,
            nombre_remitente: resp.data.nombre_remitente,
            direccion_remitente: resp.data.direccion_remitente,
            telefono_remitente: resp.data.telefono_remitente,
            email_remitente: resp.data.email_remitente,
            pais_destino: resp.data.pais_destino,
            nombre_destinatario: resp.data.nombre_destinatario,
            direccion_destinatario: resp.data.direccion_destinatario,
            telefono_destinatario: resp.data.telefono_destinatario,
            email_destinatario: resp.data.email_destinatario,
            total: resp.data.total,
          })
          // Reactivar el validador asíncrono
        }
      })
    }
  }

  // validaciones para el formulario
  crearFormulario() {
    this.forma = this.fb.group({
      numero_guia: [
        this.generarNumeroGuia(),
        [Validators.required, Validators.maxLength(10)],
        this.validadores.existeGuia.bind(this.validadores),
      ],
      fecha_envio: ['', [Validators.required]],
      pais_origen: ['', [Validators.required, Validators.maxLength(100)]],
      nombre_remitente: ['', [Validators.required, Validators.maxLength(10)]],
      direccion_remitente: [
        '',
        [Validators.required, Validators.maxLength(10)],
      ],
      telefono_remitente: [
        '',
        [Validators.maxLength(50), Validators.pattern('^\\+\\d{3}\\d{0,47}$')],
      ],
      email_remitente: [
        '',
        [
          Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'),
          Validators.maxLength(50),
        ],
      ],
      pais_destino: ['', [Validators.required, Validators.maxLength(100)]],
      nombre_destinatario: [
        '',
        [Validators.required, Validators.maxLength(100)],
      ],
      direccion_destinatario: [
        '',
        [Validators.required, Validators.maxLength(50)],
      ],
      telefono_destinatario: [
        '',
        [Validators.maxLength(50), Validators.pattern('^^\\+\\d{3}\\d{0,47}$')],
      ],
      email_destinatario: [
        '',
        [
          Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'),
          Validators.maxLength(50),
        ],
      ],
      total: [
        '',
        [Validators.required, Validators.pattern('^\\d{1,16}(\\.\\d{1,2})?$')],
      ],
    });
  }

  cargarDataAlFormulario() {
    this.forma.reset({
      numero_guia: this.generarNumeroGuia(),
      pais_origen: 'Seleccione un país',
      pais_destino: 'Seleccione un país',
    });
  }

  // para cuando se presione el boton guardar
  guardar() {
    console.log(this.forma);
    if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach((control) => {
        control.markAsTouched();
      });
    }

    Swal.fire({
      title: 'Espere',
      text:'Guardando Información',
      icon:'info',
      allowOutsideClick:false
    });
    Swal.showLoading();

    // El formulario es válido, obtener los datos
    const datosFormulario = this.forma.value;
    // Formatear la fecha
    if (datosFormulario.fecha_envio) {
      datosFormulario.fecha_envio = this.formatearFecha(
        datosFormulario.fecha_envio
      );
    }
    console.log('Datos del Formulario:', datosFormulario);
    console.log(this.guia.guia_id);
    
    if (this.guia.guia_id) {
      // Enviar los datos al servicio para guardar en la base de datos
      this.GuiaService.updateGuia(this.guia.guia_id, datosFormulario).subscribe(
        (respuesta) => {
          console.log('Datos Actualizados:', respuesta);
          Swal.fire({
            title: datosFormulario.numero_guia,
            text: 'Datos actualizados con éxito',
            icon: 'success'
            });
        },
        (error) => {
          console.error('Error al guardar:', error);
          // Manejar el error
        });
    } else {
      // Enviar los datos al servicio para guardar en la base de datos
      this.GuiaService.postGuia(datosFormulario).subscribe(
        (respuesta) => {
          console.log('Datos guardados:', respuesta.data);
          this.guia = respuesta.data;
          Swal.fire({
            title: datosFormulario.numero_guia,
            text: respuesta.message,
            icon: 'success'
            });
          
        },
        (error) => {
          console.error('Error al guardar:', error);
          // Manejar el error
        }
      );
    }

    // Posteo de informacion
    this.forma.reset({
      numero_guia: this.generarNumeroGuia(),
      pais_origen: 'Seleccione un país',
      pais_destino: 'Seleccione un país',
    });
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

  // method to generated number guia
  generarNumeroGuia(): string {
    return uuidv4().substring(0, 10); // Cortar para ajustar al tamaño deseado
  }

  get guiaNoValido() {
    return (
      this.forma.get('numero_guia')?.invalid &&
      this.forma.get('numero_guia')?.touched
    );
  }
  get fechaNoValido() {
    return (
      this.forma.get('fecha_envio')?.invalid &&
      this.forma.get('fecha_envio')?.touched
    );
  }
  get origenNoValido() {
    return (
      this.forma.get('pais_origen')?.invalid &&
      this.forma.get('pais_origen')?.touched
    );
  }
  get remitenteNoValido() {
    return (
      this.forma.get('nombre_remitente')?.invalid &&
      this.forma.get('nombre_remitente')?.touched
    );
  }
  get direccion1NoValido() {
    return (
      this.forma.get('direccion_remitente')?.invalid &&
      this.forma.get('direccion_remitente')?.touched
    );
  }
  get telefono1NoValido() {
    return (
      this.forma.get('telefono_remitente')?.invalid &&
      this.forma.get('telefono_remitente')?.touched
    );
  }
  get email1NoValido() {
    return (
      this.forma.get('email_remitente')?.invalid &&
      this.forma.get('email_remitente')?.touched
    );
  }
  get destinoNoValido() {
    return (
      this.forma.get('pais_destino')?.invalid &&
      this.forma.get('pais_destino')?.touched
    );
  }
  get destinatarioNoValido() {
    return (
      this.forma.get('nombre_destinatario')?.invalid &&
      this.forma.get('nombre_destinatario')?.touched
    );
  }
  get direccion2NoValido() {
    return (
      this.forma.get('direccion_destinatario')?.invalid &&
      this.forma.get('direccion_destinatario')?.touched
    );
  }
  get telefono2NoValido() {
    return (
      this.forma.get('telefono_destinatario')?.invalid &&
      this.forma.get('telefono_destinatario')?.touched
    );
  }
  get email2NoValido() {
    return (
      this.forma.get('email_destinatario')?.invalid &&
      this.forma.get('email_destinatario')?.touched
    );
  }
  get totalNoValido() {
    return this.forma.get('total')?.invalid && this.forma.get('total')?.touched;
  }
}

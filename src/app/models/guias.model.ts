export class GuiasModel {
    guia_id: number;
    numero_guia: string;
    fecha_envio: string;
    pais_origen: string;
    nombre_remitente: string;
    direccion_remitente: string;
    telefono_remitente?: number;
    email_remitente?: string;
    pais_destino: string;
    nombre_destinatario: string;
    direccion_destinatario: string;
    telefono_destinatario?: number;
    email_destinatario?: string;
    total: number;
    facturas:{
        factura_id: number
        establecimiento: string
        punto_emision: string
        secuencial: number
        fecha_emision: string
        sub_total: number
        impuesto: number
        total: number
    }[];

    constructor(){
        this.guia_id = 0
        this.numero_guia = ''
        this.fecha_envio = ''
        this.pais_origen = ''
        this.nombre_remitente = ''
        this.direccion_remitente = ''
        this.telefono_remitente = 0
        this.email_remitente = ''
        this.pais_destino = ''
        this.nombre_destinatario = ''
        this.direccion_destinatario = ''
        this.telefono_destinatario = 0
        this.email_destinatario = ''
        this.total = 0,
        this.facturas=[]
    }
}
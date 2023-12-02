// interface to guia
export interface GuiaInterface {
    guia_id: number;
    numero_guia: string;
    fecha_envio: Date;
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
}
      

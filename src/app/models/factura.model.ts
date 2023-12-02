export class FacturaModel{
    factura_id: number;
    establecimiento: string;
    punto_emision: string;
    secuencial: number;
    fecha_emision: string;
    sub_total: number;
    impuesto: number;
    total: number;

    constructor(){
        this.factura_id = 0;
        this.establecimiento = '';
        this.punto_emision = '';
        this.secuencial = 0;
        this.fecha_emision = '';
        this.sub_total = 0;
        this.impuesto = 0;
        this.total = 0;
    }
}
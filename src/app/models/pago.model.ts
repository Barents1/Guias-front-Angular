export class PagoModel{
    pago_id: number;
    tipo_pago: string;
    valor: number;
    fk_factura_id: number;

    constructor(){
        this.pago_id = 0;
        this.tipo_pago = '';
        this.valor = 0;
        this.fk_factura_id = 0;
    }
}
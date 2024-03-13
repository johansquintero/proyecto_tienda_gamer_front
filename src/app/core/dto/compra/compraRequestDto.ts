
export class CompraRequestDto {
    constructor() {
        this.compraProductos = [];
        this.total = 0;
    }
    /**
     * id del cliente que realiza la compra
     */
    customerId: number;

    /**
     * fecha de la compra
     */
    date: string;

    /**
     * total a pagar en la compra
     */
    total: number;

    /**
     * metodo de pago de la compra
     */
    paymentMethod: string;

    /**
     * detalle de la compra que se obtiene al relacionar las compras con los productos
     */
    compraProductos: any[];

}
import { CompraProductoResponseDto } from "../compraproducto/compraProductoResponseDto";

export interface CompraResponseDto{
    /**
     * id de la compra
     */
    id:Number;

    /**
     * id del cliente que realiza la compra
     */
    customerId:number;

    /**
     * fecha de la compra
     */
    date:string;

    /**
     * total a pagar en la compra
     */
    total:number;

    /**
     * metodo de pago de la compra
     */
    paymentMethod:number;

    /**
     * detalle de respuesta de la compra que se obtiene al relacionar las compras con los productos
     */
    compraProductos:CompraProductoResponseDto[];
}
export class CompraProductoRequestDto {
    constructor() {}
    /**
     * id del producto
     */
    productId: number;

    /**
     * cantidad de productos a comprar
     */
    quantity: number;

    /**
     * total a pagar
     */
    total: number;
}
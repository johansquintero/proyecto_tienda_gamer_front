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

    /**
     * nombre del producto para mostra en el detalle, se asigna como opcional ya que no es necesario enviarlo al backend
     */

    productName?:string;
}
export interface CompraProductoResponseDto{
     /**
     *Nombre del producto a referenciar
     */
     productName:string;

     /**
      * cantidad de productos a comprar
      */
     quantity:number;
 
     /**
      * total a pagar
      */
     total:number;
}
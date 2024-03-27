import { ProductoResponseDto } from "../produto/productoResponseDto";

export interface CartResponseDto{
    id:number;
    customerId:number;
    productos:ProductoResponseDto[];
}
import { MarcaDto } from "../marca/marcaDto";

export interface TipoDto{
    id:number;
    name:string;
    marcas:MarcaDto[];
}
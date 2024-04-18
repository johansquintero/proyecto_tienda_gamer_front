export interface ProductoCartDto{
    id:number;
    name:string;
    description:string;
    price:number;
    tipo:string;
    marca:string;
    quantity:number;
    imagePath:string;
    checked?:boolean,
    selectedQuantity?:number;
} 
export interface AuthClientetDto{
    /**
     * Nombre de usuario del cliente
     */
    id:number;

    /**
     * Nombre de usuario del cliente
     */
    username:string;

    /**
     * Contraseña del cliente
     */
    password:string;

    /**
     * Direccion de correo electronico del cliente
     */
    email:string;

    /**
     * Numero telefonico del cliente
     */
    telephone:string;

    /**
     * Direccion de vivienda del cliente
     */
    address:string;

    role:string;
}
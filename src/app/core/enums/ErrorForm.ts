export enum ErrorForm {
    REQUIRED_FIELD = 'El campo es requerido',
    MAX_LENGTH_FIELD = 'El campo debe ser mas corto',
    MIN_LENGTH_FIELD = 'El campo debe ser mas largo',
    EMAIL_FIELD = 'El campo debe ser de formato example@email.com',
    NUMBER_FIELD = 'El campo debe ser de formato numerico',
    LETTER_AND_NUMERIC_FIELD = 'El campo debe estar compuesto solo por letras y numeros',
    LETTER_FIELD = 'El campo debe ser de formato de letras',
    MISMATCH_FIELDS = 'Las contraseñas no coinciden',
    INVALID_IMAGE = 'El archivo seleccionado no es de formato de imagen'
}
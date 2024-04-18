import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { ErrorForm } from '../enums/ErrorForm';
/**
 * Esta clase TypeScript es un componente padre que proporciona funcionalidades de 
 * validación genéricas para formularios en una aplicación.
 */
export class AppBaseComponent {
  /**
   * Este método comprueba si un campo específico de un formulario ha sido tocado 
   * (es decir, el usuario ha interactuado con él) y si es inválido. Retorna true 
   * si el campo ha sido tocado y es inválido, de lo contrario, retorna false.
   * @param form grupo de formulario a comprobrar
   * @param field campo del grupo del formulario
   * @returns booleano de comprobacion
   */
  public isTouchedField = (form: FormGroup, field: string): boolean => {
    return form?.get(field).touched == true && form?.get(field).invalid;
  }

  /**
   * Similar a isTouchedField, este método verifica si un campo específico del formulario 
   * ha sido modificado (es decir, tiene un estado "dirty") y si es inválido. Retorna true 
   * si el campo ha sido modificado y es inválido, de lo contrario, retorna false.
   * @param form grupo de formulario a comprobrar
   * @param field campo del grupo del formulario
   * @returns booleano de comprobacion
   */

  public isDirtyField = (form: FormGroup, field: string): boolean => {
    return form?.get(field).dirty == true && form?.get(field).invalid;
  }

  /**
   * Este método devuelve un mensaje de error para un campo específico del formulario. 
   * Verifica si el campo ha sido modificado y es inválido, y luego determina el tipo de error 
   * que tiene el campo para devolver un mensaje adecuado.
   * @param formGroup grupo de formulario a evaluar
   * @param field campo a evaluar
   * @returns string del mensaje de error correspondiente al error dado
   */

  public getErrorField(formGroup: FormGroup, field: string): string {
    let message: string;
    if (this.isDirtyField(formGroup, field)) {
      switch (formGroup.get(field).invalid) {
        case (formGroup.get(field).hasError("invalidEmail")):
          message = ErrorForm.EMAIL_FIELD;
          break;
        case (formGroup.get(field).hasError("invalidNumber")):
          message = ErrorForm.NUMBER_FIELD;
          break;
        case (formGroup.get(field).hasError("invalidLetter")):
          message = ErrorForm.LETTER_FIELD;
          break;
        case (formGroup.get(field).hasError("invalidLetterAndNumeric")):
          message = ErrorForm.LETTER_AND_NUMERIC_FIELD;
          break;
        case (formGroup.get(field).hasError('required')):
          message = ErrorForm.REQUIRED_FIELD;
          break;
        case (formGroup.get(field).hasError('minlength')):
          message = ErrorForm.MIN_LENGTH_FIELD;
          break;
        case (formGroup.get(field).hasError('maxlength')):
          message = ErrorForm.MAX_LENGTH_FIELD;
          break;
        case (formGroup.hasError("mismatch")):
          console.log("llego")
          message = ErrorForm.MISMATCH_FIELDS;
          break;
        case (formGroup.hasError("invalidImage")):
          message = ErrorForm.INVALID_IMAGE;
          break;
      }
    }
    return message;
  }

  /**
   * Este método recorre recursivamente los controles del formulario y devuelve un objeto que 
   * contiene los errores de validación para cada control. Si el control es un FormControl, 
   * simplemente devuelve sus errores. Si el control es un FormGroup, itera sobre sus controles hijos y 
   * llama recursivamente a getFormErrors para cada uno, construyendo un objeto que contiene los errores 
   * de todos los controles hijos. el fin de este metodo es para mostrar todos los errores del formgroup en consola
   * @param control 
   * @returns 
   */
  public getFormErrors(control: AbstractControl): { [key: string]: any } | null {
    if (control instanceof FormControl) {
      return control.errors;
    }

    if (control instanceof FormGroup) {
      const errors: { [key: string]: any } = {};

      Object.keys(control.controls).forEach(key => {
        const childControl = control.get(key);
        const childErrors = this.getFormErrors(childControl);

        if (childErrors) {
          errors[key] = childErrors;
        }
      });
      return Object.keys(errors).length ? errors : null;
    }
    return null;
  }
}
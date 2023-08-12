import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { ErrorForm } from '../enums/ErrorForm';
/**
 * Componente padre con validaciones generales
 */
export class AppBaseComponent {
  public isTouchedField = (form: FormGroup, field: string): boolean => {
    return form?.get(field).touched == true && form?.get(field).invalid;
  }

  public isDirtyField = (form: FormGroup, field: string): boolean => {
    return form?.get(field).dirty == true && form?.get(field).invalid;
  }

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
          message = ErrorForm.MISMATCH_FIELDS;
          break;
      }
    }
    return message;
  }

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
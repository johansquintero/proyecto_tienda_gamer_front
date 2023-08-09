import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
/**
 * Componente padre con validaciones generales
 */
export class AppBaseComponent {
    public isTouchedField = (form: FormGroup, field: string): boolean => {
        return form?.get(field).touched == true && form?.get(field).invalid;
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
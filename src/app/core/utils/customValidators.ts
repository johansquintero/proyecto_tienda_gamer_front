import {
  AbstractControl,
  FormGroupDirective,
  NgForm,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
/**
 * clase para manejar validadores personalizados
 */

export class CustomValidators extends Validators {
  static EmailValidator(control: AbstractControl): ValidationErrors | null {
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;

    if (control.value && emailPattern.test(control.value)) {
      return null; // Válido
    } else {
      return { invalidEmail: true }; // Inválido(codigo para llamar en el hasError)
    }
  }

  static NumericValidator(control: AbstractControl): ValidationErrors | null {
    const numberPattern = /^[0-9]+$/;
    if (control.value && numberPattern.test(control.value)) {
      return null; // Válido
    } else {
      return { invalidNumber: true }; // Inválido(codigo para llamar en el hasError)
    }
  }

  static LetterValidator(control: AbstractControl): ValidationErrors | null {
    const letterPattern = /^[a-zA-Z]/;
    if (control.value && letterPattern.test(control.value)) {
      return null; // Válido
    } else {
      return { invalidLetter: true }; // Inválido(codigo para llamar en el hasError)
    }
  }

  static LetterAndNumericValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const letterAndNumericPattern = /^[a-zA-Z]+[0-9]*$/;

    if (control.value && letterAndNumericPattern.test(control.value)) {
      return null; // Válido
    } else {
      return { invalidLetterAndNumeric: true }; // Inválido(codigo para llamar en el hasError)
    }
  }
  static validateImage(control: AbstractControl): ValidationErrors | null {
    const file = control.value;
    if (file) {
      const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
      const extension = file.split('.').pop()?.toLowerCase();
      if (extension && allowedExtensions.includes(extension)) {
        // Si la extensión del archivo está dentro de las extensiones permitidas, se considera válido
        return null;
      } else {
        // Si la extensión del archivo no está permitida, se devuelve un error de validación
        return { invalidImage: true };
      }
    } else {
      return { invalidImage: true };
    }
  }

  static MatchValidator(source: string, target: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const sourceControl = control.get(source);
      const targetControl = control.get(target);
      return sourceControl &&
        targetControl &&
        sourceControl.value != targetControl.value
        ? { mismatch: true }
        : null;
    };
  }
}

//validaciones cruzadas dada por una funcion
export const crossPasswordValidator: ValidatorFn = (
  formGroupControl: AbstractControl<{
    password: string;
    repeatPassword: string;
  }>
): ValidationErrors | null => {
  const sourceControl = formGroupControl.value.password;
  const targetControl = formGroupControl.value.repeatPassword;
  return sourceControl !== targetControl ? { mismatch: true } : null;
};

export class PasswordStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: AbstractControl,
    form: FormGroupDirective | NgForm
  ): boolean {
    if (!control || !control.parent) {
      return false;
    }
    return control.parent.hasError('mismatch');
  }
}

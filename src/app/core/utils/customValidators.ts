import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
/**
 * clase para manejar validadores personalizados
 */

export class CustomValidators extends Validators {

    static EmailValidator(control: AbstractControl): ValidationErrors | null {
        const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;

        if (!control.value || emailPattern.test(control.value)) {
            return null; // Válido
        } else {
            return { invalidEmail: true }; // Inválido(codigo para llamar en el hasError)
        }
    }

    static NumericValidator(control: AbstractControl): ValidationErrors | null {
        const numberPattern = /^[0-9]/;

        if (!control.value || numberPattern.test(control.value)) {
            return null; // Válido
        } else {
            return { invalidNumber: true }; // Inválido(codigo para llamar en el hasError)
        }
    }

    static LetterValidator(control: AbstractControl): ValidationErrors | null {
        const letterPattern = /^[a-zA-Z]/;
        if (!control.value || letterPattern.test(control.value)) {
            return null; // Válido
        } else {
            return { invalidLetter: true }; // Inválido(codigo para llamar en el hasError)
        }
    }

    static LetterAndNumericValidator(control: AbstractControl): ValidationErrors | null {
        const letterAndNumericPattern = /^[A-Za-z0-9]{5,25}/;

        if (!control.value || letterAndNumericPattern.test(control.value)) {
            return null; // Válido
        } else {
            return { invalidLetterAndNumeric: true }; // Inválido(codigo para llamar en el hasError)
        }
    }

    static MatchValidator(source: string, target: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const sourceControl = control.get(source);
            const targetControl = control.get(target);
            return sourceControl && targetControl && sourceControl.value != targetControl.value ? { mismatch: true } : null;
        }
    }
}
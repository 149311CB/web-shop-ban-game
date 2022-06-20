import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function securePass(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return {
      notSecure:
        !/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{12,}$/.test(
          control.value
        ),
    };
  };
}

export function isMatch(value: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return {
      isMatch: value === control.value,
    };
  };
}

import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormControlService {

  dateRegex: RegExp = new RegExp(/^(0?[1-9]|1[0-2])\/(0?[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/);
  constructor() { }

  public isInvalid(control: AbstractControl, showErrors: boolean = false): boolean {
    if (!control) {
      return false;
    }
    return (control.touched && control.invalid || control.invalid && showErrors);
  }  

  dateValidator  (control: AbstractControl): { [key: string]: boolean } | null {
    if (!control || control.value) {

      let date = control.value;
      const match =  (date instanceof Date && !isNaN(date as any) && date.getFullYear() > 1900);
      if (!match) {
        return { 'dateInvalid': true };
      }
      return null;
    }

    return null;
  }

  isValidDate = (date: Date): boolean => {

    if (date.getFullYear() < 2000) {
      return false;
    }
    return (date instanceof Date && !isNaN(date as any));
  }
}

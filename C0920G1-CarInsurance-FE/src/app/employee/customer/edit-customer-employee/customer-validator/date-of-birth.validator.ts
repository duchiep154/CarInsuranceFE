import { AbstractControl, ValidationErrors } from '@angular/forms'

export function dateOfBirth(control: AbstractControl): ValidationErrors | null {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();
  let currentTime = mm + '/' + dd + '/' + yyyy;
  let millisecondsYearOfBirth = Date.parse(control.value);
  let millisecondsCurrentYear = Date.parse(currentTime);
  let millisecondsAge = millisecondsCurrentYear - millisecondsYearOfBirth;
  let millisecondsYear = 1000 * 60 * 60 * 24 * 365;
  let age = millisecondsAge / millisecondsYear;

  if (age < 18) {
    return {'minAge': true}
  }
  if (age > 150) {
    return {'maxAge': true}
  }
  return null;
}

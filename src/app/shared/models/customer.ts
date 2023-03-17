import {EmailValidator} from "@angular/forms"

export interface customer {
  firstname: string,
  lastname: string,
  dateOfBirth: string,//Date,
  phoneNumber: string,
  email: string,//EmailValidator,
  bankAccountNumber: string
}

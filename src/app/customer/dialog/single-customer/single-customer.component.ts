import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {customer} from "../../../shared/models/customer";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomerService} from "../../../shared/services/customer.service";
import {PhoneNumberUtil, PhoneNumberFormat, PhoneNumberType} from 'google-libphonenumber';

@Component({
  selector: 'app-single-customer',
  templateUrl: './single-customer.component.html',
  styleUrls: ['./single-customer.component.css']
})
export class SingleCustomerComponent implements OnInit {
  @Input() parentData: any;
  @Output('parentCloseFun') parentCloseFun: EventEmitter<any> = new EventEmitter();
  userDataForm: FormGroup;
  dialogState: string;
  customers: customer[];

  constructor(private customerService: CustomerService) {
  }

  ngOnInit(): void {
    this.customers = this.customerService.readAllCustomers();
    this.customerService.data$.subscribe();
    this.dialogState = (this.parentData['data'] == null) ? 'new' : 'update';
    if (this.dialogState ==='new'){
      this.userDataForm = new FormGroup({
        firstname: new FormControl('', [Validators.required]),
        lastname: new FormControl('', [Validators.required]),
        dateOfBirth: new FormControl('', [Validators.required]),
        phoneNumber: new FormControl('', [Validators.required, this.mobileNumberValidator]),
        email: new FormControl('',[Validators.required, Validators.email, this.isAvailEmailValidator]),
        bankAccountNumber: new FormControl('', [Validators.required , Validators.minLength(16) , Validators.maxLength(16)]),
      })
    }else { //Update
      this.userDataForm = new FormGroup({
        firstname: new FormControl(this.parentData['data']?.firstname, [Validators.required]),
        lastname: new FormControl(this.parentData['data']?.lastname, [Validators.required]),
        dateOfBirth: new FormControl(this.parentData['data']?.dateOfBirth, [Validators.required]),
        phoneNumber: new FormControl(this.parentData['data']?.phoneNumber, [Validators.required, this.mobileNumberValidator]),
        email: new FormControl(this.parentData['data']?.email, [Validators.required, Validators.email ]),
        bankAccountNumber: new FormControl(this.parentData['data']?.bankAccountNumber, [Validators.required , Validators.minLength(16) , Validators.maxLength(16)]),
      })
    }
  }

  isAvailEmailValidator(control: FormControl) {
      let email = control.value;
      if (email && email.indexOf("@") != -1) {
        let theCustomers = JSON.parse(localStorage.getItem('customerData')!);
        for(let i=0 ; i< theCustomers.length ;i++){
          if (email === theCustomers[i]?.email) {
            return {
              existEmail : true
            }
          }
        }
      }
      return null
  }

  mobileNumberValidator(control: FormControl) {
      let mobileNumber = control.value;
      try {
        const phoneNumberUtil = PhoneNumberUtil.getInstance();
        const phoneNumber = phoneNumberUtil.parse(mobileNumber, 'IR');
        const isMobile = phoneNumberUtil.getNumberType(phoneNumber) === PhoneNumberType.MOBILE;
        if (!isMobile ) {
          return {
            isMobileNumber : true
          }
        }
      }catch (e){
      }
      return null
  }

  onSaveData(data: any) {
    if (data?.valid) {
      switch (this.dialogState) {
        case 'new' :
          this.customerService.createCustomer(data.value);
          this.parentCloseFun.emit();
          break;
        case 'update' :
          this.customerService.updateCustomer(this.parentData['indx'], data.value);
          this.parentCloseFun.emit();
          break;
      }
    } else {
    }
  }
}

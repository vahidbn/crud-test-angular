import {Injectable} from '@angular/core';
import {JsonArray} from "@angular/compiler-cli/ngcc/src/packages/entry_point";
import {Observable, BehaviorSubject} from 'rxjs';
import {customer} from "../models/customer";
import {DatePipe, formatDate} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  // @ts-ignore
  private dataSubject = new BehaviorSubject<customer>([]);
  data$ = this.dataSubject.asObservable();

  constructor(public datePipe: DatePipe) {
    const data = localStorage.getItem('customerData');
    if (data) {
      this.dataSubject.next(JSON.parse(data));
    }
  }


  public createCustomer(data: any): void {
    if (localStorage.getItem('customerData')) {
      if (!this.checkForDuplication(data)) {
        let currentData = JSON.parse(localStorage.getItem('customerData')!);
        currentData.push(data)
        localStorage.setItem('customerData', JSON.stringify(currentData));
        this.dataSubject.next(data);
      } else {
        alert('Duplicated')
      }
    } else {
      const obj = [];
      obj.push(data);
      localStorage.setItem('customerData', JSON.stringify(obj))
      this.dataSubject.next(data);
    }
  };

  public checkForDuplication(newCustomer: customer) {
    let result: boolean = false;
    let currentData = JSON.parse(localStorage.getItem('customerData')!);
    currentData.map(function (customer: customer) {

      if (
        !result &&
        customer?.firstname === newCustomer?.firstname &&
        customer?.lastname === newCustomer?.lastname
        //  && customer?.dateOfBirth === JSON.stringify(newCustomer?.dateOfBirth)
      ) {
        result = true;
      }
    })
    return result;
  }

  public readCustomer(index: number) {
    let customerData = JSON.parse(localStorage.getItem('customerData')!);
    return customerData[index];
  }

  public readAllCustomers() {
    return JSON.parse(localStorage.getItem('customerData')!);
  }

  public updateCustomer(index: number, data: customer) {
    //  if (!this.checkForDuplication(data)){
    let customerData = JSON.parse(localStorage.getItem('customerData')!)
    customerData[index].firstname = data.firstname;
    customerData[index].lastname = data.lastname;
    customerData[index].dateOfBirth = data.dateOfBirth;
    //customerData[index].dateOfBirth =formatDate(data.dateOfBirth,'yyyy/MM/dd','en');
    customerData[index].email = data.email;
    customerData[index].phoneNumber = data.phoneNumber;
    customerData[index].bankAccountNumber = data.bankAccountNumber;
    localStorage.setItem('customerData', JSON.stringify(customerData));
    this.dataSubject.next(data);
    //  }else {
    //   alert('Duplicated')
    // }

  }

  public deleteCustomer(index: number, data: customer) {
    let customerData = JSON.parse(localStorage.getItem('customerData')!);
    customerData.splice(index, 1);
    localStorage.setItem('customerData', JSON.stringify(customerData));
    this.dataSubject.next(data);
  };

}

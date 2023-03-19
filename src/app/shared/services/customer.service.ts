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


  public createCustomer(data: any): any {
    if (localStorage.getItem('customerData')) {
        if (!this.checkForDuplication(data)) {
            let currentData = JSON.parse(localStorage.getItem('customerData') || '[]');
            if (Array.isArray(currentData)) {
              currentData.push(data);
              localStorage.setItem('customerData', JSON.stringify(currentData));
              this.dataSubject.next(data);
            } else {
              const newData = [data];
              localStorage.setItem('customerData', JSON.stringify(newData));
              this.dataSubject.next(data);
            }
          return  {status:true , message:'The operation was successful'};
        } else {
          return  {status:false , message:'sorry ,The entered customer information is duplicate'};
        }
    } else {
      const obj = [];
      obj.push(data);
      localStorage.setItem('customerData', JSON.stringify(obj))
      this.dataSubject.next(data);
    }
  };

  private checkForDuplication(newCustomer: customer) {
    let result: boolean = false;
    let currentData = JSON.parse(localStorage.getItem('customerData') || '[]');
    for (let i = 0; i <= currentData?.length - 1; i++) {
      if (!result &&
        currentData[i]?.firstname === newCustomer?.firstname &&
        currentData[i]?.lastname === newCustomer?.lastname) {
        result = true;
      }
    }

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
    return 1 ;
    //  }else {
    //   alert('Duplicated')
    // }

  }

  public deleteCustomer(index: number, data: customer) {
    try {
      let customerData = JSON.parse(localStorage.getItem('customerData')!);
      customerData.splice(index, 1);
      localStorage.setItem('customerData', JSON.stringify(customerData));
      this.dataSubject.next(data);
      return 1
    }catch (e){
      return  0
    }
  };

}

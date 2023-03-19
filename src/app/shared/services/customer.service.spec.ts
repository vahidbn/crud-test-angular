import { TestBed } from '@angular/core/testing';

import { CustomerService } from './customer.service';
import {DatePipe} from "@angular/common";

describe('CustomerService', () => {
  let service: CustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[DatePipe]
    });
    service = TestBed.inject(CustomerService);
    localStorage.clear();
  });

  it('should be CustomerService created', () => {
    expect(service).toBeTruthy();
  });


  it("should add new customer if already not exist" ,()=>{
    const newCustomer = {
      firstname : 'vahid' ,
      lastname :'barzegar' ,
      dateOfBirth : '1986-01-01'  ,
      email:'vahid.vbn@gmail.com' ,
      phoneNumber: '09124256733' ,
      bankAccountNumber :'1234567812341234'
    }
    service.createCustomer(newCustomer) ;
    expect(localStorage.getItem('customerData')).toBeTruthy() ;
    expect(JSON.parse(localStorage.getItem('customerData')!)).toContain(newCustomer);
  });


  xit('should not add new customer if already exist' , ()=>{
    const existingCustomer ={
      firstname : 'vahid' ,
      lastname :'barzegar' ,
      dateOfBirth : '1986-01-01'  ,
      email:'vahid.vbn@gmail.com' ,
      phoneNumber: '09124256733' ,
      bankAccountNumber :'1234567812341234'
    }
    localStorage.setItem('customerData' , JSON.stringify(existingCustomer)) ;

    const newCustomer ={
      firstname : 'vahid' ,
      lastname :'barzegar' ,
      dateOfBirth : '1986-01-01'  ,
      email:'vahid.vbn@gmail.com' ,
      phoneNumber: '09124256733' ,
      bankAccountNumber :'1234567812341234'
    }
    service.createCustomer(newCustomer) ;
    expect(localStorage.getItem('customerData')).toBeTruthy();
    expect(JSON.parse(localStorage.getItem('customerData')!)).toContain(existingCustomer) ;
    expect(JSON.parse(localStorage.getItem('customerData')!)).not.toContain(newCustomer) ;

  })


  it('should read customer by index',()=>{
    const newCustomer ={
      firstname : 'vahid' ,
      lastname :'barzegar' ,
      dateOfBirth : '1986-01-01'  ,
      email:'vahid.vbn@gmail.com' ,
      phoneNumber: '09124256733' ,
      bankAccountNumber :'1234567812341234'
    }
    service.createCustomer(newCustomer) ;
    expect(service.readCustomer(0)).toBeTruthy();
  });


  it('should update customerData By Index' , ()=>{
    const customerCurrentData ={
      firstname : 'vahid' ,
      lastname :'barzegar' ,
      dateOfBirth : '1986-01-01'  ,
      email:'vahid.vbn@gmail.com' ,
      phoneNumber: '09124256733' ,
      bankAccountNumber :'1234567812341234'
    }
    service.createCustomer(customerCurrentData);

    const customerUpdatedData ={
      firstname : 'Mahan' ,
      lastname :'barzegar' ,
      dateOfBirth : '2022-01-01'  ,
      email:'Mahan.vbn@gmail.com' ,
      phoneNumber: '09124256733' ,
      bankAccountNumber :'1234567812341234'
    }
    expect(service.updateCustomer(0 , customerUpdatedData)).toBeTruthy()

  })


  it('should be Delete Customer By index', ()=>{
    const customer ={
      firstname : 'vahid' ,
      lastname :'barzegar' ,
      dateOfBirth : '1986-01-01'  ,
      email:'vahid.vbn@gmail.com' ,
      phoneNumber: '09124256733' ,
      bankAccountNumber :'1234567812341234'
    }
    service.createCustomer(customer);
    expect(service.deleteCustomer(0 , customer)).toBeTruthy()
  })
});

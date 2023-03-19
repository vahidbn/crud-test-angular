import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCustomerComponent } from './single-customer.component';
import {CustomerService} from "../../../shared/services/customer.service";
import {By} from "@angular/platform-browser";

  describe('SingleCustomerComponent', () => {
    let component: SingleCustomerComponent;
    let fixture: ComponentFixture<SingleCustomerComponent>;
    let customerServiceSpy: jasmine.SpyObj<CustomerService>;

    beforeEach(async () => {
      const spy = jasmine.createSpyObj('CustomerService',
        ['createCustomer', 'updateCustomer', 'readAllCustomers']);
      await TestBed.configureTestingModule({
        declarations: [SingleCustomerComponent],
        providers: [{provide: CustomerService, useValue: spy}]
      })
        .compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(SingleCustomerComponent);
      component = fixture.componentInstance;
      customerServiceSpy = TestBed.inject(CustomerService) as jasmine.SpyObj<CustomerService>;
      fixture.detectChanges();
    });

    xit('should create', () => {
      component.parentData = {
        data :{
          firstname : 'vahid' ,
          lastname :'barzegar' ,
          dateOfBirth : '1986-01-01'  ,
          email:'vahid.vbn@gmail.com' ,
          phoneNumber: '09124256733' ,
          bankAccountNumber :'1234567812341234'
        } ,
        indx : null
      };
      component.ngOnInit();
      expect(component).toBeTruthy();
    });

    xit('should set dialogState to "new" when parentData is null', () => {

    });

    xit('should set dialogState to "update" when parentData is not null', () => {

    });

    xit('should create new user when onSaveData is called with valid data and dialogState is "new"', () => {

    });

});

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomerRoutingModule} from "./customer-routing.module";
import { SingleCustomerComponent } from './dialog/single-customer/single-customer.component';
import {FormsModule, NG_VALIDATORS, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from "@angular/material/core";
import {MatDividerModule} from "@angular/material/divider";
import {CustomerService} from "../shared/services/customer.service";
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [
    SingleCustomerComponent
  ],
  exports: [
    SingleCustomerComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule,
    MatDialogModule
  ],
  providers:[
    CustomerService ,
  ]
})
export class CustomerModule {
}

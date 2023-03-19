import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {
  AppComponent,
  DialogDeleteConfirmationDialog,
  DialogSingleCustomerDialog, DialogViewCustomerDialog,
} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from "@angular/material/table";
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {MatMenuModule} from "@angular/material/menu";
import {CustomerModule} from "./customer/customer.module";
import {CustomerService} from "./shared/services/customer.service";
import {DatePipe} from "@angular/common";
import {MatListModule} from "@angular/material/list";


@NgModule({
  declarations: [
    AppComponent,
    DialogViewCustomerDialog ,
    DialogSingleCustomerDialog,
    DialogDeleteConfirmationDialog,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatMenuModule,
    CustomerModule ,
    MatListModule
  ],
  providers: [CustomerService , DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogSingleCustomerDialog,
    DialogViewCustomerDialog ,
    DialogDeleteConfirmationDialog]
})
export class AppModule {
}

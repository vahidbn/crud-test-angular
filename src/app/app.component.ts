import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {customer} from "./shared/models/customer";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {anySymbolName} from "@angular/core/schematics/migrations/typed-forms/util";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CustomerService} from "./shared/services/customer.service";


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'crud-test-angular-latest';
  tempData : any ;
  columnsTitle: string[] = ['avatar', 'firstname', 'dateOfBirth', 'phoneNumber', 'bankAccountNumber', 'actions'];
  customerData: any;

  constructor(public dialog: MatDialog) {
  }
  //@ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit(): void {
    this.getCustomersData();
  }

  getCustomersData() {
    this.customerData = JSON.parse(localStorage.getItem('customerData')!);
  }

  onCustomerDialog(data: any, indx: any) {
    const dialogRef = this.dialog.open(DialogSingleCustomerDialog, {
      width: '60%',
      maxWidth: '',
      maxHeight: '',
      data: {data, indx}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCustomersData();
    });
  }
  onViewCustomer(customerData : customer){
    const dialogRef = this.dialog.open(DialogViewCustomerDialog, {
      width: '60%',
      maxWidth: '',
      maxHeight: '',
      data: {customerData }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCustomersData();
    });
  }

  onDeleteDialog(index: number, data: customer) {
    const dialogRef = this.dialog.open(DialogDeleteConfirmationDialog, {
      width: '40%',
      maxWidth: '',
      maxHeight: '',
      data: {data, index}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getCustomersData();
    });
  }

}


@Component({
  selector: 'dialog-single-customer-dialog',
  templateUrl: 'customer/dialog/dialog-single-customer-dialog.html',
})
export class DialogSingleCustomerDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogSingleCustomerDialog>,
    @Inject(MAT_DIALOG_DATA) public data: customer) {
  }
  onClose(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'dialog-delete-confirmation-dialog',
  templateUrl: 'customer/dialog/dialog-delete-confirmation-dialog.html',
})
export class DialogDeleteConfirmationDialog {
  constructor(
    public customerService: CustomerService,
    public dialogRef: MatDialogRef<DialogDeleteConfirmationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: customer) {
  }
  onDelete() {
    // @ts-ignore
     this.customerService.deleteCustomer(this.data['index'], null);
  }
}


@Component({
  selector: 'dialog-view-customer-dialog',
  templateUrl: 'customer/dialog/dialog-view-customer-dialog.html',
})
export class DialogViewCustomerDialog {
  constructor(
    public customerService: CustomerService,
    public dialogRef: MatDialogRef<DialogViewCustomerDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

}

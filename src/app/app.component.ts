import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {customer} from "./shared/models/customer";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {anySymbolName} from "@angular/core/schematics/migrations/typed-forms/util";


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
export class AppComponent implements OnInit, AfterViewInit {
  title = 'crud-test-angular-latest';

  columnsTitle: string[] = ['firstname','lastname' ,'dateOfBirth','phoneNumber','email','bankAccountNumber'];
  customerData: any;


  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: any;


  //@ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit(): void {
    this.tempData();
  }

  tempData() {
    const data : customer[] = [
      {
        firstname: 'vahid',
        lastname: 'bn',
        dateOfBirth: '12-1-1986',
        phoneNumber: '09124256733',
        email: 'me@gmail.com',
        bankAccountNumber: '5022291084075835'
      },
      {
        firstname: 'vahid',
        lastname: 'bn',
        dateOfBirth: '12-1-1986',
        phoneNumber: '09124256733',
        email: 'me@gmail.com',
        bankAccountNumber: '5022291084075835'
      },
    ];
    localStorage.setItem('customerData', JSON.stringify(data));

    const ELEMENT_DATA: PeriodicElement[] = [
      {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
      {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
      {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
      {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
      {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
      {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
      {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
      {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
      {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
      {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
    ];
    localStorage.setItem('ELEMENT_DATA', JSON.stringify(ELEMENT_DATA));
    this.getCustomersData();
  }


  getCustomersData() {
    this.customerData = JSON.parse(localStorage.getItem('customerData')!);

    this.dataSource = JSON.parse(localStorage.getItem('ELEMENT_DATA')!)  ;

  }

  ngAfterViewInit(): void {

  }
}

import {Injectable} from '@angular/core';
import {JsonArray} from "@angular/compiler-cli/ngcc/src/packages/entry_point";
 import { Observable ,BehaviorSubject } from 'rxjs';
import {customer} from "../models/customer";

@Injectable({
    providedIn: 'root'
})
export class CustomerService {
     private dataSubject = new BehaviorSubject<customer>([]);
     data$ = this.dataSubject.asObservable();

    constructor() {
        const data = localStorage.getItem('my-data');
        if (data) {
            this.dataSubject.next(JSON.parse(data));
        }
    }


    public createCustomer(data: any): void {
        localStorage.setItem('my-data', JSON.stringify(data))
        this.dataSubject.next(data);
    };

    public readCustomer() {
    };

    public updateCustomer() {
    };

    public deleteCustomer() {
    };

}

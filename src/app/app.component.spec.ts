import {AppComponent, DialogSingleCustomerDialog, DialogViewCustomerDialog} from "./app.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {async, of} from "rxjs";
import {MatDialogModule} from "@angular/material/dialog";
import {CustomerService} from "./shared/services/customer.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async function() {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule ,MatDialogModule],
      declarations: [ ],
      providers: [CustomerService]
    }).compileComponents();
     });


  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
  //
  it('should retrieve customer data on init', () => {
    spyOn(component, 'getCustomersData');
    component.ngOnInit();
    expect(component.getCustomersData).toHaveBeenCalled();
  });

  it('should open single customer dialog on click', () => {
    const dialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRef.afterClosed.and.returnValue(of(true));
    spyOn(component.dialog, 'open').and.returnValue(dialogRef);
  });


  //
  // it('should open DialogSingleCustomerDialog on click', () => {
  //   const dialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed', 'close']);
  //   dialogRef.afterClosed.and.returnValue(of(true));
  //   spyOn(component.dialog, 'open').and.returnValue(dialogRef);
  //   component.onCustomerDialog({}, {});
  //   expect(component.dialog.open).toHaveBeenCalledWith(DialogSingleCustomerDialog, {
  //     width: '60%',
  //     maxWidth: '',
  //     maxHeight: '',
  //     data: {data: {}, indx: {}}
  //   });
  //   expect(dialogRef.close).toHaveBeenCalled();
  // });
  //

  //
  // it('should open delete confirmation dialog on click', () => {
  //   const mockData = {data: {}, index: 0};
  //   spyOn(component.dialog, 'open').and.returnValue({afterClosed: () => of(true)});
  //   component.onDeleteDialog(0, mockData);
  //   expect(component.dialog.open).toHaveBeenCalled();
  // });
  //
  // it('should open view customer dialog on click', () => {
  //   const mockData = {customerData: {}};
  //   spyOn(component.dialog, 'open').and.returnValue({afterClosed: () => of(true)});
  //   component.onViewCustomer(mockData);
  //   expect(component.dialog.open).toHaveBeenCalled();
  // });
});

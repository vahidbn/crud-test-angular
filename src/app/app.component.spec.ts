import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";



describe('AppComponent', () => {
  let component: AppComponent;
  beforeEach(async () => {
    component = new AppComponent(null);
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers:[
      ],imports:[
        MatDialogModule
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'crud-test-angular-latest'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('crud-test-angular-latest');
  });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('.content span')?.textContent).toContain('crud-test-angular-latest app is running!');
  // });


  it('should load customer data from local storage on initialization', () => {
    const customerData = [{/* sample customer object */}, {/* sample customer object */}];
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(customerData));

    component.ngOnInit();

    expect(localStorage.getItem).toHaveBeenCalledWith('customerData');
    expect(component.customerData).toEqual(customerData);
  });

});

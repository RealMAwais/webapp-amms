import { OnInit, Component, DebugNode } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Model } from 'src/app/model.model'
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/compat/storage';
import firebase from 'firebase/compat';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  /////////////////////////////////////
  buildingDataForm: FormGroup
  unitDataForm: FormGroup
  companyForm: FormGroup
  leaseForm: FormGroup
  incomeForm: FormGroup
  expenseForm: FormGroup
  taskForm: FormGroup
  employeeForm: FormGroup
  rentForm: FormGroup
  singleRentForm: FormGroup
  /////////////////////////////////////

  deleteIndexId: any;
  localArray_home: any = [];
  selectedBuildingId: any;
  unitOptionsArray: any = [];
  mySelectedIndexFilter: any;
  myArrayToShow: any;
  localArray_lease: any;


  async ngOnInit() {
    await this.getBuildingsData();
  }

  getBuildingsData() {
    this.ApiService.getBuildingsAPI().subscribe((fireBaseData: any) => {
      this.localArray_home = fireBaseData;
      this.getLeaseData();

    });
  }

  getLeaseData() {
    this.ApiService.getLeaseAPI().subscribe((fireBaseData: any) => {
      this.localArray_lease = fireBaseData;
    });
  }

  constructor(
    private fb: FormBuilder,
    private ApiService: ApiService,
    private firestore: AngularFirestore,
    private fireStorage: AngularFireStorage,
    public router: Router
  ) {


    this.buildingDataForm = new FormGroup({
      owner: new FormControl('', Validators.required),
      adminCompany: new FormControl('', Validators.required),
      propertyType: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('New York'),
      zip: new FormControl('', Validators.required),
      wsh_dry: new FormControl(''),
      elevator: new FormControl(''),
      totalUnit: new FormControl(''),
      amount_fine: new FormControl(''),
      remarks: new FormControl('')
    });

    this.unitDataForm = new FormGroup({
      building: new FormControl('', Validators.required),
      unitNo: new FormControl('', Validators.required),
      unitType: new FormControl('', Validators.required),
      beds: new FormControl(''),
      baths: new FormControl(''),
      floors: new FormControl(''),
      rent: new FormControl(''),
      security: new FormControl('')
    });

    this.companyForm = new FormGroup({
      companyName: new FormControl('SMYM Realty'),
      city: new FormControl('', Validators.required),
      state: new FormControl({ value: 'New York', disabled: true }),
      address: new FormControl(''),
      companyType: new FormControl('', Validators.required),
      zip: new FormControl(''),
      phone: new FormControl(''),
      mobile: new FormControl(['', Validators.required, Validators.minLength(7)]),
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])
    });

    this.leaseForm = new FormGroup({
      building: new FormControl(''),
      // city: new FormControl('', Validators.required),
      state: new FormControl({ value: 'New York', disabled: true }),
      unitNo: new FormControl(''),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      socialSecurity: new FormControl(''),
      phone: new FormControl(''),
      mobile: new FormControl(['', Validators.required, Validators.minLength(7)]),
      legalRent: new FormControl(''),
      prefRent: new FormControl(''),
      securityHeld: new FormControl(''),
      leaseStartDate: new FormControl(''),
      leaseEndDate: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      remarks: new FormControl('')
    });

    this.incomeForm = new FormGroup({
      incomeType: new FormControl(''),
      amount: new FormControl(''),
      dateOfIncome: new FormControl(''),
      remarks: new FormControl('')
    });

    this.expenseForm = new FormGroup({
      building: new FormControl(''),
      expenseType: new FormControl('', Validators.required),
      amountDue: new FormControl(''),
      amountPaid: new FormControl(''),
      dueDate: new FormControl(''),
      datePaid: new FormControl(''),
      comments: new FormControl('')
    });

    this.taskForm = new FormGroup({
      building: new FormControl('586 Union Street'),
      taskType: new FormControl('', Validators.required),
      unitNo: new FormControl(''),
      taskStatus: new FormControl(''),
      taskStartDate: new FormControl(''),
      taskEndDate: new FormControl(''),
      taskDescription: new FormControl('')
    });

    this.employeeForm = new FormGroup({
      building: new FormControl({ value: '586 Union Street', disabled: false }),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      employementStartDate: new FormControl(''),
      employementEndDate: new FormControl(''),
      salary: new FormControl(''),
      remarks: new FormControl('')
    });

    this.rentForm = new FormGroup({
      building: new FormControl({ value: '586 Union Street', disabled: false }),
      month: new FormControl('', Validators.required),
      year: new FormControl('', Validators.required),
      tenantName: new FormControl('', Validators.required),
      leaseID: new FormControl('', Validators.required),
      unitNo: new FormControl(''),
      discount: new FormControl(''),
      charges: new FormControl(''),
      rent: new FormControl('', Validators.required),
      paidRent: new FormControl(''),
      rentDueDate: new FormControl(''),
      datePaid: new FormControl(''),
      previousBalance: new FormControl(''),
      chequeNo: new FormControl(''),
      bankName: new FormControl(''),
      comments: new FormControl(''),
      managementFee: new FormControl(''),
      garageFee: new FormControl(''),
      storageSpaceFee: new FormControl(''),
      antennaFee: new FormControl(''),
      internetFee: new FormControl('')
    });

    this.singleRentForm = new FormGroup({
      building: new FormControl({ value: '586 Union Street', disabled: false }),
      leaseID: new FormControl(''),
      month: new FormControl(''),
      year: new FormControl(''),
      tenantName: new FormControl(''),
      unitNo: new FormControl(''),
      discount: new FormControl(''),
      charges: new FormControl(''),
      rent: new FormControl(''),
      paidRent: new FormControl(''),
      rentDueDate: new FormControl(''),
      datePaid: new FormControl(''),
      previousBalance: new FormControl(''),
      chequeNo: new FormControl(''),
      bankName: new FormControl(''),
      comments: new FormControl('')
    });

  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  companyTypeOptions = [{ value: 'Admin' }, { value: 'Owner' }];

  cityOptions = [{ value: 'Bronx' }, { value: 'Brooklyn' }, { value: 'Manhattan' }, { value: 'Queens' }, { value: 'State Island' }];

  propertyOptions = [{ value: 'Co-op Apartments' }, { value: 'Residential' }, { value: 'Commercial' }, { value: 'Residential/Commercial' }];

  unitTypeOptions = [{ value: 'Apartment' }, { value: 'Studio' }, { value: 'Office' }, { value: 'Commercial' }];

  unitNoOptions = [{ value: '1L' }, { value: '1R' }, { value: '2L' }, { value: '2R' }, { value: '3L' }, { value: '3R' }, { value: '4L' }, { value: '4R' }];

  incomeTypeOptions = [{ value: 'Profit Earned' }, { value: 'Royalties' }];

  expenseTypeOptions = [{ value: 'Advertisement' }, { value: 'Auto & Travel' }, { value: 'Cleaning & Maintenance' }, { value: 'Commission' },
  { value: 'Depreciation' }, { value: 'Electric' }, { value: 'Employee Salary' }, { value: 'Fuel / Heat' }, { value: 'Insurance' },
  { value: 'Interest (Non-Mortgage)' }, { value: 'Legal & Professional Fees' }, { value: 'Management Fee' }, { value: 'Mortgage Interest Paid to Banks' },
  { value: 'New Construction' }, { value: 'Other' }, { value: 'Repair' }];

  taskTypeOptions = [{ value: 'Plumbing' }, { value: 'Heating' }, { value: 'Repair' }, { value: 'Air Conditioning' }];

  taskStatusOptions = [{ value: 'Completed' }, { value: 'In Progress' }, { value: 'On Hold' }];

  yearOptions = [{ value: '2011' }, { value: '2012' }, { value: '2013' }, { value: '2014' }, { value: '2015' }, { value: '2016' },
  { value: '2017' }, { value: '2018' }, { value: '2019' }, { value: '2020' }, { value: '2021' }, { value: '2022' }, { value: '2023' }];



  /////////////////////////////////------ADDING DATA TO FIRESTORE------///////////////////////////////////

  addBuildingDataToFirestore() {

    let userObject = this.buildingDataForm.value;
    const id = this.firestore.createId();
    userObject['id'] = id;
    this.ApiService.addBuilding(userObject);
    // this.buildingDataForm.reset();
  }


  onBuildingDropDown(event: Event) {
    this.selectedBuildingId = (event.target as HTMLSelectElement).value;
    console.log('building dropdown id: ', this.selectedBuildingId);
  }

  addUnitDataToFirestore() {
    const unitObject = this.unitDataForm.value;
    console.log('unitObject', unitObject);
    this.ApiService.updateUnitToBuilding(unitObject, this.selectedBuildingId);
    // this.resetUnitForm();
  }

  unitOptionsforLease() {

    this.mySelectedIndexFilter = this.localArray_home.filter((data: any) => data.address === this.selectedBuildingId);
    this.mySelectedIndexFilter.map((items: any) => this.unitOptionsArray = items.unitDetails);
    // console.log('unitOptionsArray: ', this.unitOptionsArray);
  }

  addLeasetoFirestore() {
    let leaseObject = this.leaseForm.value;
    const id = this.firestore.createId();
    leaseObject['id'] = id;
    this.ApiService.addLease(leaseObject);
    // this.leaseForm.reset();
  }

  addCompanytoFirestore() {
    let companyObject = this.companyForm.value;
    const id = this.firestore.createId();
    companyObject['id'] = id;
    this.ApiService.addCompany(companyObject);
    // this.leaseForm.reset();
  }

  addIncometoFirestore() {
    let incomeObject = this.incomeForm.value;
    const id = this.firestore.createId();
    incomeObject['id'] = id;
    this.ApiService.addIncome(incomeObject);
    // this.leaseForm.reset();
  }

  addExpensetoFirestore() {
    let expenseObject = this.expenseForm.value;
    const id = this.firestore.createId();
    expenseObject['id'] = id;
    this.ApiService.addExpense(expenseObject);
    // this.leaseForm.reset();
  }

  addRenttoFirestore() {
    let rentObject = this.rentForm.value;
    const id = this.firestore.createId();
    rentObject['id'] = id;
    this.ApiService.addRent(rentObject);
    // this.leaseForm.reset();
  }


  ////////////////////////////////////////-------FORM CONTROL METHOD----/////////////////////////////////////////////////
  get fBuild() {
    return this.buildingDataForm.controls;
  }

  get fUnit() {
    return this.unitDataForm.controls;
  }

  get fCompany() {
    return this.companyForm.controls;
  }

  get fLease() {
    return this.leaseForm.controls;
  }

  get fIncome() {
    return this.incomeForm.controls;
  }

  get fExpense() {
    return this.expenseForm.controls;
  }

  get fTask() {
    return this.taskForm.controls;
  }

  get fEmployee() {
    return this.employeeForm.controls;
  }

  get fRent() {
    return this.rentForm.controls;
  }

  get fSingleRent() {
    return this.singleRentForm.controls;
  }



  submitExpenseForm() {
    console.log('expenseForm', this.expenseForm.value);
  }

  submitTaskForm() {
    console.log('taskForm', this.taskForm.value);
  }

  submitEmployeeForm() {
    console.log('employeeForm', this.employeeForm.value);
  }

  submitRentForm() {
    console.log('rentForm', this.rentForm.value);
  }

  submitSingleRentForm() {
    console.log('singleRentForm', this.singleRentForm.value);
  }



  ////////////////////////////////////////-------RESET BUTTON METHOD----/////////////////////////////////////////////////
  resetBuildingForm() {
    this.buildingDataForm.reset();
  }

  resetUnitForm() {
    this.unitDataForm.reset();
  }

  resetCompanyForm() {
    this.companyForm.reset();
  }

  resetLeaseForm() {
    this.leaseForm.reset();
  }

  resetIncomeForm() {
    this.incomeForm.reset();
  }

  resetExpenseForm() {
    this.expenseForm.reset();
  }

  resetTaskForm() {
    this.taskForm.reset();
  }

  resetEmployeeForm() {
    this.employeeForm.reset();
  }

  resetRentForm() {
    this.rentForm.reset();
  }

  resetSingleRentForm() {
    this.singleRentForm.reset();
  }


}

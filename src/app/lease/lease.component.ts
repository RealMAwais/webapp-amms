import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ngxCsv } from 'ngx-csv';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-lease',
  templateUrl: './lease.component.html',
  styleUrls: ['./lease.component.css']
})
export class LeaseComponent implements OnInit {
  localArray_lease: any;
  totalLength: any;
  p: any;
  deleteIndexId: any;


  constructor(
    public ApiService: ApiService
  ) { }

  ngOnInit(): void {
    this.getLeaseData();
  }

  getLeaseData() {
    this.ApiService.getLeaseAPI().subscribe((fireBaseData: any) => {
      this.localArray_lease = fireBaseData;
      this.findSum(this.localArray_lease);
    });
  }

  value: any
  total = 0;
  findSum(data: any) {
    this.value = data
    for (let j = 0; j < data.length; j++) {
      this.total += this.value[j].prefRent;
    }
  }

  leaseEditForm = new FormGroup({
    building: new FormControl(''),
    // city: new FormControl('', Validators.required),
    // state: new FormControl({ value: 'New York', disabled: true }),
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

  ////////////////////////////////////////-------EXPORT CSV FILE METHOD----//////////////////////////////////////////////
  exportCSV() {
    var options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Lease',
      useBom: true,
      noDownload: false,
      headers: ["Sr No.", "Building Name"]
    };
    new ngxCsv(this.localArray_lease, "BuildingReport", options);
  }

  onEdit(id: any) {

  }

  deleteLease(deleteIndexId: any) {
    this.ApiService.deleteLease(deleteIndexId);

  }




}

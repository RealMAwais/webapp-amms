import { Component, OnInit } from '@angular/core';
import { ngxCsv } from 'ngx-csv';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-rent-report',
  templateUrl: './rent-report.component.html',
  styleUrls: ['./rent-report.component.css']
})
export class RentReportComponent implements OnInit {
  localArray_rent: any;
  totalLength: any;
  p: any;
  deleteIndexId: any
  localArray_lease: any;


  constructor(
    public ApiService: ApiService
  ) { }

  ngOnInit(): void {
    this.getRentData();
  }

  getRentData() {
    this.ApiService.getRentAPI().subscribe((fireBaseData: any) => {
      this.localArray_rent = fireBaseData;
      this.findSum(this.localArray_rent);
    });
  }

  value: any
  total = 0;
  findSum(data: any) {
    this.value = data
    for (let j = 0; j < data.length; j++) {
      this.total += this.value[j].paidRent
    }
  }



  onEdit(id: any) {

  }

  deleteRent(id: any) {
    this.ApiService.deleteRent(id);
  }


  ////////////////////////////////////////-------EXPORT CSV FILE METHOD----//////////////////////////////////////////////
  exportCSV() {
    var options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: '-----RENT REPORT SUMMARY-----',
      useBom: true,
      noDownload: false,
      headers: ["SR.", "BUILDING-NAME", "TENANT NAME", "YEAR/MONTH", "RENT DUE DATE", "DATE PAID", "RENT", "PAID RENT", "CHEQUE NO", "BANK NAME", "COMMENTS"]
    };
    new ngxCsv(this.localArray_rent, "RentSummary", options);
  }


}

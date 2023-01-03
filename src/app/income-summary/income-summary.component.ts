import { Component, OnInit } from '@angular/core';
import { ngxCsv } from 'ngx-csv';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-income-summary',
  templateUrl: './income-summary.component.html',
  styleUrls: ['./income-summary.component.css']
})
export class IncomeSummaryComponent implements OnInit {
  localArray_income: any;
  totalLength: any;
  p: any;
  deleteIndexId: any

  constructor(
    public ApiService: ApiService
  ) { }

  ngOnInit(): void {
    this.getIncomeData();
  }

  getIncomeData() {
    this.ApiService.getIncomeAPI().subscribe((fireBaseData: any) => {
      this.localArray_income = fireBaseData;
      this.findSum(this.localArray_income);
      // console.log('localArray_income: ', this.localArray_income);
    });
  }

  value: any
  total = 0;
  findSum(data: any) {
    this.value = data
    // console.log('value: ', this.value);
    for (let j = 0; j < data.length; j++) {
      this.total += this.value[j].amount
      // console.log('total:', this.total)
    }
  }


  onEdit(id: any) {

  }

  deleteIncome(id: any) {
    this.ApiService.deleteIncome(id);
  }

  ////////////////////////////////////////-------EXPORT CSV FILE METHOD----//////////////////////////////////////////////
  exportCSV() {
    var options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Income',
      useBom: true,
      noDownload: false,
      headers: ["Sr No.", "Income Name"]
    };
    new ngxCsv(this.localArray_income, "Income", options);
  }

}

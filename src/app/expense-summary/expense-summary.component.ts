import { Component, OnInit } from '@angular/core';
import { ngxCsv } from 'ngx-csv';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-expense-summary',
  templateUrl: './expense-summary.component.html',
  styleUrls: ['./expense-summary.component.css']
})
export class ExpenseSummaryComponent implements OnInit {
  totalLength: any;
  p: any;
  deleteIndexId: any
  localArray_expense: any;


  constructor(
    public ApiService: ApiService
  ) { }

  ngOnInit(): void {
    this.getExpenseData();
  }

  getExpenseData() {
    this.ApiService.getExpenseAPI().subscribe((fireBaseData: any) => {
      this.localArray_expense = fireBaseData;
      this.findSum(this.localArray_expense);
      // console.log('localArray_expense', this.localArray_expense);
    });
  }

  value: any
  total = 0;
  findSum(data: any) {
    this.value = data
    // console.log('value: ', this.value);
    for (let j = 0; j < data.length; j++) {
      this.total +=  this.value[j].amountPaid;
      // console.log('total:', this.total)
    }
  }

  onEdit(id: any) {

  }

  deleteExpense(id: any) {
    this.ApiService.deleteExpense(id);
  }

  ////////////////////////////////////////-------EXPORT CSV FILE METHOD----//////////////////////////////////////////////
  exportCSV() {
    var options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Expense',
      useBom: true,
      noDownload: false,
      headers: ["Sr No.", "Expense Name"]
    };
    new ngxCsv(this.localArray_expense, "Expense", options);
  }


}

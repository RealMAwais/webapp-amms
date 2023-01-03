import { Component, OnInit } from '@angular/core';
import { ngxCsv } from 'ngx-csv';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-building-table',
  templateUrl: './building-table.component.html',
  styleUrls: ['./building-table.component.css']
})

export class BuildingTableComponent implements OnInit {
  //////////////////////////////////////////////////////////////
  sortingOrder: string = 'ascending';
  localArray_building: any = [];
  p: any;
  deleteIndexId: any;
  deleted: any;
  totalLength: any;
  ///////////////////////////////////////////////////////////////


  constructor(
    public ApiService: ApiService
  ) { }

  ngOnInit(): void {
    this.getBuildingData();
  }

  getBuildingData() {
    this.ApiService.getBuildingsAPI().subscribe((fireBaseData: any) => {
      this.localArray_building = fireBaseData;
    });
  }

  ////////////////////////////////////////-------SORTING BUTTON METHOD----///////////////////////////////////////////////
  sortArray(property: any, order: string) {
    if (order == 'ascending') {
      this.localArray_building.sort((a: any, b: any) => b[property] > a[property] ? -1 : 1);
      this.sortingOrder = 'descending';
    } else {
      this.localArray_building.sort((a: any, b: any) => b[property] > a[property] ? 1 : -1);
      this.sortingOrder = 'ascending';
    }
  }
  ////////////////////////////////////////-------EXPORT CSV FILE METHOD----//////////////////////////////////////////////
  exportCSV() {
    var options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Building Details',
      useBom: true,
      noDownload: false,
      headers: ["Sr No.", "Building Name"]
    };
    new ngxCsv(this.localArray_building, "BuildingReport", options);
  }

  ////////////////////////////////////////-------DELETE BUTTON METHOD----////////////////////////////////////////////////
  public deleteBuilding(deleteIndexId: any) {
    this.ApiService.deleteBuilding(deleteIndexId);
  }

  ////////////////////////////////////////-------EDIT METHOD START HERE----/////////////////////////////////////////////
  // this.buildingDataForm = new FormGroup({
  //   owner: new FormControl('', Validators.required),
  //   adminCompany: new FormControl('', Validators.required),
  //   propertyType: new FormControl('', Validators.required),
  //   address: new FormControl('586 Union Street', Validators.required),
  //   city: new FormControl('', Validators.required),
  //   state: new FormControl('New York'),
  //   zip: new FormControl('11215', Validators.required),
  //   wsh_dry: new FormControl(''),
  //   elevator: new FormControl(''),
  //   totalUnit: new FormControl(''),
  //   amount_fine: new FormControl(''),
  //   remarks: new FormControl('')
  // });

  onEdit(id: any) {
    // const mySelectedIndexFilter = this.localArray_building.filter((data: any) => data.id === id);
    // this.editForm.setValue({
    //   name: mySelectedIndexFilter[0].name,
    //   phone: mySelectedIndexFilter[0].phone,
    //   email: mySelectedIndexFilter[0].email,
    //   address: mySelectedIndexFilter[0].address,
    //   picture: mySelectedIndexFilter[0].picture
    // });
    // this.base64Image = mySelectedIndexFilter[0].picture;
    // this.editableId = id;

  }
}

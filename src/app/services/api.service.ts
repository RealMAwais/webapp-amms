import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Model } from 'src/app/model.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { arrayUnion } from "firebase/firestore";


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  index: any;
  private subject = new Subject<any>();


  constructor(
    private firestore: AngularFirestore,
    private NgxUiLoaderService: NgxUiLoaderService
  ) { }
///////////////////////////////////////---GET CALLS---////////////////////////////////////
  getBuildingsAPI(): Observable<any> {
    return this.firestore.collection('Buildings').valueChanges();
  }
  getLeaseAPI(): Observable<any> {
    return this.firestore.collection('Lease').valueChanges();
  }

  getIncomeAPI(): Observable<any> {
    return this.firestore.collection('Income').valueChanges();
  }

  getExpenseAPI(): Observable<any> {
    return this.firestore.collection('Expense').valueChanges();
  }

  getRentAPI(): Observable<any> {
    return this.firestore.collection('Rent').valueChanges();
  }

  ////////////////////////////////////////////////////////////////////////////////////////
 

  addBuilding(dataObject: Model) {
    return this.firestore.collection('Buildings').doc(dataObject.id as any).set(dataObject);
  }

  deleteBuilding(buildingIndexId: any) {
    return this.firestore.collection('Buildings').doc(buildingIndexId).delete();
  }

  deleteLease(leaseID: any) {
    return this.firestore.collection('Lease').doc(leaseID).delete();
  }

  deleteIncome(id: any) {
    return this.firestore.collection('Income').doc(id).delete();
  }

  deleteExpense(id: any) {
    return this.firestore.collection('Expense').doc(id).delete();
  }


  deleteRent(id: any) {
    return this.firestore.collection('Rent').doc(id).delete();
  }

  //////////////////////////////////////////////////////////////////////////////


  updateUnitToBuilding(unitObject: any, selectedBuildingId: any) {
    return this.firestore.collection('Buildings').doc(selectedBuildingId).update({ 'unitDetails': arrayUnion(unitObject) });
    // return this.firestore.collection('Buildings').doc(selectedBuildingId).ref.update('unitDetails', arrayUnion(unitObject));
  };

  addLease(leaseObject: Model) {
    return this.firestore.collection('Lease').doc(leaseObject.id).set(leaseObject);
  }

  addCompany(companyObject: Model) {
    return this.firestore.collection('Company').doc(companyObject.id).set(companyObject);
  }

  addIncome(incomeObject: Model) {
    return this.firestore.collection('Income').doc(incomeObject.id).set(incomeObject);
  }

  addExpense(expenseObject: Model) {
    return this.firestore.collection('Expense').doc(expenseObject.id).set(expenseObject);
  }

  addRent(rentObject: Model) {
    return this.firestore.collection('Rent').doc(rentObject.id).set(rentObject);
  }


  // deleteUnitFromBuilding(unitObject: any, selectedBuildingId: any) {
  //   return this.firestore.collection('Buildings').doc(selectedBuildingId)
  // };



  // ngxUiLoader() {
  //   this.NgxUiLoaderService.start();
  //   setTimeout(() => {
  //     this.NgxUiLoaderService.stop();
  //   }, 2000);
  // }

  // setData(data: any) {
  //   this.index = data;
  // }

  // getData() {
  //   return this.index
  // }




}

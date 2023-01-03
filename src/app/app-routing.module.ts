import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BuildingTableComponent } from './building-table/building-table.component';
import { HomeComponent } from './home/home.component';
import { LeaseComponent } from './lease/lease.component';
import { IncomeSummaryComponent } from './income-summary/income-summary.component';
import { ExpenseSummaryComponent } from './expense-summary/expense-summary.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { RentReportComponent } from './rent-report/rent-report.component';

const routes: Routes = [
  { path: 'home/building', component: BuildingTableComponent },
  { path: 'home/lease-summary', component: LeaseComponent },
  { path: 'home/income-summary', component: IncomeSummaryComponent },
  { path: 'home/expense-summary', component: ExpenseSummaryComponent },
  { path: 'home/rent-summary', component: RentReportComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },




];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }

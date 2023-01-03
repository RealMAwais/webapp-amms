import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { BuildingTableComponent } from './building-table/building-table.component'
import { NgxPaginationModule } from 'ngx-pagination';
import { HomeComponent } from './home/home.component';
import { NgxUiLoaderModule, NgxUiLoaderRouterModule } from "ngx-ui-loader";
import { LeaseComponent } from './lease/lease.component';
import { RentReportComponent } from './rent-report/rent-report.component';
import { IncomeSummaryComponent } from './income-summary/income-summary.component';
import { ExpenseSummaryComponent } from './expense-summary/expense-summary.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
    AppComponent,
    BuildingTableComponent,
    HomeComponent,
    LeaseComponent,
    RentReportComponent,
    IncomeSummaryComponent,
    ExpenseSummaryComponent,
    PageNotFoundComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    NgxPaginationModule,
    NgxUiLoaderModule, NgxUiLoaderRouterModule
  ],
  providers: [AppComponent, HomeComponent, BuildingTableComponent, LeaseComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

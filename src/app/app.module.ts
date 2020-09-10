import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { PlayerStatisticsComponent } from './player-statistics/player-statistics.component';
import { TeamStatisticsComponent } from './team-statistics/team-statistics.component';
import { BiddingStatisticsComponent } from './bidding-statistics/bidding-statistics.component';
import { HomeComponent } from './home/home.component';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { InterceptorService } from './auth-guard/interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { MatExpansionModule } from '@angular/material/expansion';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PlayerStatisticsComponent,
    TeamStatisticsComponent,
    BiddingStatisticsComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSelectModule, MatInputModule, MatFormFieldModule,
    FormsModule, ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    Ng2GoogleChartsModule,
    MatExpansionModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }

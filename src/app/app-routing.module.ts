import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerStatisticsComponent } from './player-statistics/player-statistics.component';
import { TeamStatisticsComponent } from './team-statistics/team-statistics.component';
import { BiddingStatisticsComponent } from './bidding-statistics/bidding-statistics.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {
    path:'',
    component:LoginComponent
  },
  {
  path:'home',
  component:HomeComponent
  },
  {
    path:'playerstat',
    component:PlayerStatisticsComponent,
  },
  {
    path:'teamstat',
    component:TeamStatisticsComponent
  },
  {
    path:'biddingstat',
    component:BiddingStatisticsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

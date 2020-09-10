import { Component, OnInit, ViewChild } from '@angular/core';
import { IplplayerdetailsService } from '../service/iplplayerdetails.service';
import { TeamStat, TeamAmountDTO, RoleCountDTO } from '../shared/labels.model';
import { GoogleChartInterface, ChartSelectEvent } from 'ng2-google-charts';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-team-statistics',
  templateUrl: './team-statistics.component.html',
  styleUrls: ['./team-statistics.component.css']
})
export class TeamStatisticsComponent implements OnInit {
  teamdetails: TeamStat[] = [];
  teamAmount: TeamAmountDTO[] = [];
  roleCountByTeam: RoleCountDTO[] = [];
  tableChart: GoogleChartInterface;
  columnChart: GoogleChartInterface;
  pieChart: GoogleChartInterface;
  showTableChart = true;
  screenWidth: any;

  teamDetails = ['label', 'coach', 'city', 'home', 'team'];
  lowValue = 0;
  highValue = 5;
  datasource = new MatTableDataSource<TeamStat>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private iplservice: IplplayerdetailsService) { }

  ngOnInit(): void {
    this.iplservice.getAllteamsDetails().subscribe(result => {

      this.teamdetails = result as TeamStat[];

      this.datasource = new MatTableDataSource(this.teamdetails);

     
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
    });

    this.iplservice.getTeamAmount().subscribe(result => {
      this.teamAmount = result;
      const data = [];
      data.push(['Team', 'Amount']);
      for (const team of this.teamAmount) {
        data.push([team['teamName'], team['amount']]);
      }

      this.columnChart = {
        chartType: 'ColumnChart',
        dataTable: data,
        options: {
          title: 'Teams',
          width: this.screenWidth,
          height: 350,
          is3D: true


        }
      };

    });


  }

  onSelectChart(event) {
    const team = event.selectedRowFormattedValues[0];
    console.log(team);
    this.showTableChart = false;
    this.iplservice.getROleCountByTeam(team).subscribe(result => {
      this.roleCountByTeam = result;
      const data = [];

      data.push(['Role Name', 'Count']);

      for (const team of this.roleCountByTeam) {
        data.push([team['roleName'], team['count']]);
      }
      this.showTableChart = true;
      this.pieChart = {
        chartType: 'PieChart',
        dataTable: data,
        options: {
          title: team,

          width: this.screenWidth,
          height: 350,
        }


      };

    });
  }

  resizeScreen(event) {
    this.screenWidth = event.target.innerWidth;
  
  }


  public getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }

}

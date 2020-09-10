import { Component, OnInit } from '@angular/core';
import { IplplayerdetailsService } from '../service/iplplayerdetails.service';
import { teamstat, TeamAmountDTO, RoleCountDTO } from '../shared/labels.model';
import { GoogleChartInterface, ChartSelectEvent } from 'ng2-google-charts';

@Component({
  selector: 'app-team-statistics',
  templateUrl: './team-statistics.component.html',
  styleUrls: ['./team-statistics.component.css']
})
export class TeamStatisticsComponent implements OnInit {
  teamdetails: teamstat[] = []
  teamAmount:TeamAmountDTO[]=[]
  roleCountByTeam:RoleCountDTO[]=[]
  tableChart: GoogleChartInterface;
  columnChart: GoogleChartInterface;
  pieChart: GoogleChartInterface;
  show_table_chart:boolean=true
  constructor(private iplservice: IplplayerdetailsService) { }

  ngOnInit(): void {
    this.iplservice.getAllteamsDetails().subscribe(result => {

      this.teamdetails = result;
      let data = []
      data.push(["Label", "Team", "City", "Coach", "Home"])
      for (let teamdata of this.teamdetails) {
        data.push([teamdata["label"], teamdata["team"], teamdata["city"], teamdata["coach"], teamdata["home"]])
      }
      this.tableChart = {
        chartType: "Table",
        dataTable: data,
        options: {
          allowHtml: true,
          width: 500,
          height: 700
        }

      }
    })

    this.iplservice.getTeamAmount().subscribe(result=>
      {
this.teamAmount=result
        let data=[];
        data.push(["Team","Amount"]);
        for (let team of this.teamAmount) {
          data.push([team["teamName"], team["amount"]]);
        }
       
        this.columnChart = {
          chartType: "ColumnChart",
          dataTable: data,
          options: {
            title: 'Teams',
            width: 600,
            height: 300,
          
          }
  
        }
       
      })
      
     
  }

  onSelectChart(event){
    let team = event.selectedRowFormattedValues[0];
    console.log(team)
    this.show_table_chart=false
    this.iplservice.getROleCountByTeam(team).subscribe(result=>
      {
        this.roleCountByTeam=result
        let data=[];
        
        data.push(["Role Name","Count"])

        for(let team of this.roleCountByTeam)
        {
          data.push([team["roleName"],team["count"]])
        }
        this.show_table_chart=true
         this.pieChart = {
          chartType: "PieChart",
          dataTable: data,
          options: {
            title: team,
            
            width: 500,
            height: 400,
        
          }
          
          
        }

      })
  }

}

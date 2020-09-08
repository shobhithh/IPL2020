import { Component, OnInit, ViewChild } from '@angular/core';
import { IplplayerdetailsService } from '../service/iplplayerdetails.service';
import {  amountByRolename, PlayerDTO } from '../shared/labels.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { GoogleChartInterface } from 'ng2-google-charts';

@Component({
  selector: 'app-player-statistics',
  templateUrl: './player-statistics.component.html',
  styleUrls: ['./player-statistics.component.css']
})
export class PlayerStatisticsComponent implements OnInit {

  teamlabel = []
  selectedteam: string
  teamMemberDetails: PlayerDTO[] = []
  chartdata = []
  showTableData:boolean=true
  teamMembersColumns = ["name", "role", "label", "price"]
  pieChart: GoogleChartInterface;
  tableChart: GoogleChartInterface;
  datasource = new MatTableDataSource<PlayerDTO>();
  @ViewChild('scheduledOrdersPaginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private iplservice: IplplayerdetailsService) { }

  ngOnInit(): void {
    this.showTableData=false
    this.iplservice.getLabels().subscribe(data => {
      this.teamlabel = data['labels']
    })
  }

  TeamDetails() {
    this.iplservice.getPlayerDetails(this.selectedteam).subscribe(result => {
      this.showTableData=true
      this.teamMemberDetails = result as PlayerDTO[]
      this.datasource = new MatTableDataSource(this.teamMemberDetails)
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
    })
    this.iplservice.getAmountByRole(this.selectedteam).subscribe(result => {
   
      this.chartdata = result as amountByRolename[]
      
      let data = [];
      data.push(["Role", "Count"]);
      for (let s of this.chartdata) {
        data.push([s["roleName"], s["amount"]]);
      }
     this.pieChart = {
        chartType: "PieChart",
        dataTable: data,
        options: {
          title:data,
          'Role': 'Count',
          width: 500,
          height: 400
        }
      }
    })

  }

  
  selectChart(event) {
    let role = event.selectedRowFormattedValues[0];
    this.iplservice.getPlayerByTeamAndRole(this.selectedteam, role).subscribe(result => {
      console.log(result)
      let playerdetails = result
      let data = [];
      data.push(["Players", "Team", "Role", "Price"]);
      for (let p of playerdetails) {
        data.push([p["name"], p["label"], p["role"], p["price"]]);
      }
      this.tableChart = {
        chartType: "Table",
        dataTable: data,
        options: { allowHtml: true }
      }

    })
  }
}






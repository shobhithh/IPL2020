import { Component, OnInit, ViewChild } from '@angular/core';
import { IplplayerdetailsService } from '../service/iplplayerdetails.service';
import { amountByRolename, PlayerDTO } from '../shared/labels.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { GoogleChartInterface } from 'ng2-google-charts';

@Component({
  selector: 'app-player-statistics',
  templateUrl: './player-statistics.component.html',
  styleUrls: ['./player-statistics.component.css']
})
export class PlayerStatisticsComponent implements OnInit {

  teamlabel = []
  show_pie_chart: boolean = true
  show_table_chart: boolean = true
  showTable: boolean = true
  screenwidth: any;
  selectedteam: string
  teamMemberDetails: PlayerDTO[] = []
  chartdata = []
  showTableData: boolean = false
  style: object = {};
  teamMembersColumns = ["name", "role", "label", "price"]
  lowValue = 0;
  highValue = 5;
  pieChart: GoogleChartInterface;
  tableChart: GoogleChartInterface;
  datasource = new MatTableDataSource<PlayerDTO>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private iplservice: IplplayerdetailsService) { }

  ngOnInit(): void {
    this.showTableData = false
    this.iplservice.getLabels().subscribe(data => {
      this.teamlabel = data['labels']
    })
  }

  TeamDetails() {
    this.iplservice.getPlayerDetails(this.selectedteam).subscribe(result => {
      this.showTableData=true
      this.teamMemberDetails = result as PlayerDTO[];
      setTimeout(() => {    
        this.datasource = new MatTableDataSource(this.teamMemberDetails);
        this.datasource.paginator = this.paginator;
        this.datasource.sort = this.sort;
        console.log(this.datasource);
      }, 500);
    })
    this.show_pie_chart = false;
    this.iplservice.getAmountByRole(this.selectedteam).subscribe(result => {

      this.chartdata = result as amountByRolename[]
      let data = [];
      data.push(["Role", "Count"]);
      for (let s of this.chartdata) {
        data.push([s["roleName"], s["amount"]]);
      }
      this.show_pie_chart = true;
      this.pieChart = {
        chartType: "PieChart",
        dataTable: data,
        options: {
          'Role': 'Count',
          width: 500,
          height: 400
        }
      }
    })
  }



  selectChart(event) {
    let role = event.selectedRowFormattedValues[0];
    this.show_table_chart=false
    console.log(event)
    this.iplservice.getPlayerByTeamAndRole(this.selectedteam, role).subscribe(result => {
      console.log(result)
      let playerdetails = result
      let data = [];
      data.push(["Players", "Team", "Role", "Price"]);
      for (let p of playerdetails) {
        data.push([p["name"], p["label"], p["role"], p["price"]]);
      }
      this.show_table_chart=true
      this.tableChart = {
        chartType: "Table",
        dataTable: data,
        options: { allowHtml: true },
      
      }

    })
  }


  onScreenResize(event) {
    console.log(event)
    this.screenwidth = event.target.innerWidth;
    console.log(this.screenwidth)
    console.log(event.target.innerHeight)
    this.style = {
      position: 'fixed',
      width: `${this.screenwidth}px`,
      height: `${event.target.innerHeight}px`
    };

  }

  public getPaginatorData(event: PageEvent): PageEvent {

    console.log("pagination event",event)
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }
}






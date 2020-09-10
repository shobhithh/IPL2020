import { Component, OnInit, ViewChild } from '@angular/core';
import { IplplayerdetailsService } from '../service/iplplayerdetails.service';
import { AmountByRolename, PlayerDTO } from '../shared/labels.model';
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

  teamlabel = [];
  showpiechart = true;
  showtablechart = true;
  screenwidth: any;
  selectedteam: string;
  teamMemberDetails: PlayerDTO[] = [];
  chartdata = [];
  showTableData = false;

  teamMembersColumns = ['name', 'role', 'label', 'price'];
  lowValue = 0;
  highValue = 5;

  pieChart: GoogleChartInterface;
  tableChart: GoogleChartInterface;
  datasource = new MatTableDataSource<PlayerDTO>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private iplservice: IplplayerdetailsService) { }

  ngOnInit(): void {
    this.showTableData = false;
    this.iplservice.getLabels().subscribe(data => {
      this.teamlabel = data['labels'];
    });
  }

  TeamDetails() {
   
    this.showtablechart = false;
    this.iplservice.getPlayerDetails(this.selectedteam).subscribe(result => {
      this.showTableData = true;
      this.teamMemberDetails = result as PlayerDTO[];
      setTimeout(() => {
        this.datasource = new MatTableDataSource(this.teamMemberDetails);
        this.datasource.paginator = this.paginator;
        this.datasource.sort = this.sort;
        
      }, 500);
    });
    this.showpiechart = false;
    this.iplservice.getAmountByRole(this.selectedteam).subscribe(result => {

      this.chartdata = result as AmountByRolename[];
      const data = [];
      data.push(['Role', 'Count']);
      for (const s of this.chartdata) {
        data.push([s['roleName'], s['amount']]);
      }
    
      this.showpiechart = true;
      this.pieChart = {
        chartType: 'PieChart',
        dataTable: data,
        options: {
          is3D: true,
          // 'Role': 'Count',
          width: this.onScreenResize(event),
          height: 350
        }
      };
    });
  }



  selectChart(event) {
    const role = event.selectedRowFormattedValues[0];
    this.showtablechart = false;
    
    this.iplservice.getPlayerByTeamAndRole(this.selectedteam, role).subscribe(result => {

      const playerdetails = result;
      const data = [];
      data.push(['Players', 'Team', 'Role', 'Price']);
      for (const p of playerdetails) {
        data.push([p['name'], p['label'], p['role'], p['price']]);
      }
      this.showtablechart = true;
      this.tableChart = {
        chartType: 'Table',
        dataTable: data,
        options: { allowHtml: true, is3D: true }
      };

    });
  }


  onScreenResize(event) {

    this.screenwidth = event.target.innerWidth;
    return this.screenwidth;

  }

  public getPaginatorData(event: PageEvent): PageEvent {

    
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }
}






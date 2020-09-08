import { Component, OnInit, ViewChild } from '@angular/core';
import { IplplayerdetailsService } from '../service/iplplayerdetails.service';
import { amountByRolename } from '../shared/labels.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-bidding-statistics',
  templateUrl: './bidding-statistics.component.html',
  styleUrls: ['./bidding-statistics.component.css']
})
export class BiddingStatisticsComponent implements OnInit {
  playerdetails: amountByRolename[] = []
  allplayers: amountByRolename[] = []
  teamMembersColumns = ["name", "role", "label", "price"]
  datasource = new MatTableDataSource<amountByRolename>();
  @ViewChild('scheduledOrdersPaginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private ipldetails: IplplayerdetailsService) { }

  ngOnInit(): void {
    this.ipldetails.getPlayersByMaximumAmountByRole().subscribe(result => {
      this.playerdetails = result;
    })

    this.ipldetails.getAllPlayers().subscribe(result => {
      console.log(result)
      this.allplayers = result as amountByRolename[]

      this.datasource = new MatTableDataSource(this.allplayers)

      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
    })
  }

}

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class IplplayerdetailsService {

  baseURL = environment.ipldetails;
  constructor(private http: HttpClient) {
  }

  getLabels(): Observable<any> {
    const url = `${this.baseURL}labels`;
    return this.http.get<any>(url);
  }

  getPlayerDetails(teamlabel): Observable<any> {
    const url = `${this.baseURL}${teamlabel}`;
    return this.http.get<any>(url);
  }

  getAmountByRole(teamlabel): Observable<any> {
    const url = `${this.baseURL}amountbyrole/${teamlabel}`;
    return this.http.get<any>(url);
  }
  getPlayerByTeamAndRole(teamname, role): Observable<any> {
    const url = `${this.baseURL}${teamname}/${role}`;
    return this.http.get<any>(url);
  }
  getPlayersByMaximumAmountByRole(): Observable<any> {
    const url = `${this.baseURL}maxamoutbyrole`;
    return this.http.get<any>(url);
  }

  getAllPlayers(): Observable<any> {
    const url = `${this.baseURL}players/all`;
    return this.http.get<any>(url);
  }

  getAllteamsDetails(): Observable<any> {
    const url = `${this.baseURL}all`;
    return this.http.get<any>(url);
  }

  getTeamAmount(): Observable<any> {
    const url = `${this.baseURL}totalamount`;
    return this.http.get<any>(url);
  }

  getROleCountByTeam(teamName): Observable<any> {
    const url = `${this.baseURL}role/${teamName}`;
    return this.http.get<any>(url);
  }
}

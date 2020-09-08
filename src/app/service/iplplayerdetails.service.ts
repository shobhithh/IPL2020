import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  amountByRolename, teamstat, TeamAmountDTO, RoleCountDTO, PlayerDTO } from '../shared/labels.model'

@Injectable({
  providedIn: 'root'
})
export class IplplayerdetailsService {

  baseURL = environment.ipldetails
  constructor(private http: HttpClient) {
  }

  getLabels(): Observable<any> {
    let url = `${this.baseURL}labels`
    return this.http.get<any>(url);
  }

  getPlayerDetails(teamlabel): Observable<any> {
    let url = `${this.baseURL}${teamlabel}`
    return this.http.get<any>(url)
  }

  getAmountByRole(teamlabel): Observable<any> {
    let url = `${this.baseURL}amountbyrole/${teamlabel}`
    return this.http.get<any>(url)
  }
  getPlayerByTeamAndRole(teamname, role): Observable<any> {
    let url = `${this.baseURL}${teamname}/${role}`
    return this.http.get<any>(url)
  }
  getPlayersByMaximumAmountByRole():Observable<any>
  {
    let url=`${this.baseURL}maxamoutbyrole`
    return this.http.get<any>(url)
  }

  getAllPlayers():Observable<any>
  {
    let url=`${this.baseURL}players/all`
    return this.http.get<any>(url)
  }

  getAllteamsDetails():Observable<any>{
    let url=`${this.baseURL}all`
    return this.http.get<any>(url)
  }

  getTeamAmount():Observable<any>{
    let url=`${this.baseURL}totalamount`
    return this.http.get<any>(url) 
  }

  getROleCountByTeam(teamName):Observable<any>{
    let url=`${this.baseURL}role/${teamName}`
    return this.http.get<any>(url)
  }
}

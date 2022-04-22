import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Reconciliation } from './reconciliation';



@Injectable({
  providedIn: 'root'
})
export class ReconciliationService {
  //private baseURL = "http://10.220.38.141:7021/reconWS/api/recon";
  private baseURL;//= "http://localhost:8080/api/recon";
  private stbURL;

  constructor(private httpClient: HttpClient) {
    this.baseURL = environment.baseURL;
    this.stbURL = environment.stbURL;
  }

  getReconById(id: number, token: string, gwtoken: string, gwflag: string): Observable<Reconciliation> {

    if (gwflag == "N") {
      return this.httpClient.get<Reconciliation>(`${this.stbURL}` + '/' + id + '/' + token);
    }
    else {
      const httpOptions = {
        headers: new HttpHeaders()
          .set('turkcellauthorization', 'Bearer ' + gwtoken)
      }
      return this.httpClient.get<Reconciliation>(`${this.baseURL}` + '/' + id + '/' + token, httpOptions);
    }
  }

  updateRecon(id: number, token: string, gwtoken: string, gwflag: string, recon: Reconciliation): Observable<Object> {

    if (gwflag == "N") {
      return this.httpClient.put(`${this.stbURL}` + '/' + id + '/' + token, recon);
    }
    else {
      const httpOptions = {
        headers: new HttpHeaders()
          .set('turkcellauthorization', 'Bearer ' + gwtoken)
      }
      return this.httpClient.put(`${this.baseURL}` + '/' + id + '/' + token, recon, httpOptions);
    }
  }

}

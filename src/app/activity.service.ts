import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private httpClient: HttpClient) { }

  private loadHeader(): HttpHeaders {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    headers = headers.append('Access-Control-Allow-Origin', '*');
    return headers;
  }

  public getRequest(api) {
    let headers = this.loadHeader();
    return this.httpClient.get(environment.baseURL + api, { headers });
  }

  public postRequest(api, body) {
    let headers = this.loadHeader();
    console.log("BODY: "+JSON.stringify(body))
    return this.httpClient.post(environment.baseURL + api,  body, { headers });
  }

  public putRequest(api, body) {
    let headers = this.loadHeader();
    console.log("BODY: "+JSON.stringify(body))
    return this.httpClient.put(environment.baseURL + api,  body, { headers });
  }

}

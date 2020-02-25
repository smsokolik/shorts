import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class TemperatureService {

  constructor(private http: HttpClient) { }

  getTemperature(){
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=Omaha&APPID=a22666901ce990464ed746b4c4942d0e`)
    .pipe(  
      map(res => res["main"]["temp"])
    )
  }

}
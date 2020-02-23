import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class TemperatureService {

  constructor(private http: HttpClient) { }

  gifsByQuery(searchString){
    return this.http.get(`api.openweathermap.org/data/2.5/weather?q={city name}&APPID=a22666901ce990464ed746b4c4942d0e`)
    .pipe(
      map(res => res["temperature"])
    )
  }

}
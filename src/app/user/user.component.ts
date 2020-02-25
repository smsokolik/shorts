import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { TemperatureService } from '../services/temperature.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {


  constructor(private temperatureService: TemperatureService) { }

  ngOnInit(): void {
    this.temperatureService.getTemperature().
    subscribe(val=> console.log(val));
  }

}

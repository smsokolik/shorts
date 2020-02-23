import { Component, OnInit } from '@angular/core';
import { GifService } from '../service/giphyservice';
import { fromEvent } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class SearchComponent implements OnInit {
  gifs: Array<Object>
  constructor(private gifService: GifService) { }
  
  ngOnInit(): void {
    const searchField = document.getElementById("searchField");
    const searchObservable = fromEvent(searchField, "keyup").pipe(
      map(e => e.target['value']),
      filter(searchString => searchString.length > 3),
      debounceTime(400),
      distinctUntilChanged()
    );
    searchObservable.subscribe(query => this.gifService.gifsByQuery(query).subscribe(gifs => this.gifs = gifs));
  }

}
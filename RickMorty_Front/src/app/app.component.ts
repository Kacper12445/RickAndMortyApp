import { Component, OnInit } from '@angular/core';
import { SearchService } from './shared/services/search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{

  constructor(private searchService: SearchService){}

  ngOnInit(){
    this.searchService.getLibId();
  }
}

import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../shared/services/search.service'
import { Info, Pagination } from '../../shared/models/Pagination'
import { SerialCharacter } from '../../shared/models/character'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  info!: Info;
  characters!: SerialCharacter[];

  constructor(public searchService: SearchService) { }

  ngOnInit(): void {
    this.getCharacters();
  }

  min = 2;
  max = 34;

  getCharacters(): void {
    this.searchService.getPagination(Math.floor(Math.random() * (this.max - this.min + 1)) + this.min).subscribe(response => {
      this.info = response.info;
      this.characters = response.results;
    }, error => {
      console.log(error);
    });
  }
}

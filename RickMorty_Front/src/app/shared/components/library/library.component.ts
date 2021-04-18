import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { Info, Pagination } from '../../models/Pagination';
import { SerialCharacter } from '../../models/character';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.sass']
})
export class LibraryComponent implements OnInit {

  info!: Info;
  characters!: SerialCharacter[];

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    this.getCharacters();
  }

  getCharacters(): void {
    this.searchService.getPagination().subscribe(response => {
      this.info = response.info;
      this.characters = response.results;
      // console.log(this.characters[0].name);
      // console.log(this.info);
    }, error => {
      console.log(error);
    });
  }


}









 // Pagination() {
  //   this.searchService.getPagination().subscribe(data => this.pagination = {
  //     info.count: data.count,
  //     info.pages: data.pages,
  //     info.next: data.next,
  //     info.prev: data.prev,



  //   })
  // }

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { SerialCharacter } from 'src/app/shared/models/character';
import { Info } from 'src/app/shared/models/Pagination';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SearchService } from 'src/app/shared/services/search.service';



@Component({
  selector: 'app-searching-page',
  templateUrl: './searching-page.component.html',
  styleUrls: ['./searching-page.component.sass']
})
export class SearchingPageComponent implements OnInit {

  searchText;

  constructor(public authService: AuthService, public searchService: SearchService) {
    this.getCharacters();
  }

  index = 1;
  info!: Info;
  characters!: SerialCharacter[];
  min = 2;
  max = 34;

  ngOnInit(): void {
  }


  // onSubmit(f: NgForm) {
  //   const searchObserver = {
  //     next: x => {
  //       console.log('Udalo sie');
  //     },
  //     error: err => {
  //       console.log(err);
  //     }
  //   }
  //   this.authService.getHero(f.value).subscribe(searchObserver);
  //   console.log(searchObserver);
  // }


  getCharacters(): void {
    this.searchService.getPagination(Math.floor(Math.random() * (this.max - this.min + 1)) + this.min).subscribe(response => {
      this.info = response.info;
      this.characters = response.results;
    }, error => {
      console.log(error);
    });
  }

  switchPage(e) {
    if (e.target.id == "next") {
      this.index++;
      this.index = (this.index == 35) ? 0 : this.index++;
    }
    else if (e.target.id == "prev") {
      this.index--;
      this.index = (this.index == 0) ? 34 : this.index--;
    }
    this.searchService.getPagination(this.index).subscribe(response => {
      this.info = response.info;
      this.characters = response.results;
    }, error => {
      console.log(error);
    });
    console.log(this.index);
  }

}

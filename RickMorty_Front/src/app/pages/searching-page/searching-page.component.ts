import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { SerialCharacter } from 'src/app/shared/models/character';
import { Info } from 'src/app/shared/models/Pagination';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SearchService } from 'src/app/shared/services/search.service';
import { FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-searching-page',
  templateUrl: './searching-page.component.html',
  styleUrls: ['./searching-page.component.sass']
})
export class SearchingPageComponent implements OnInit {

  searchText;

  constructor(public authService: AuthService, public searchService: SearchService, public fb: FormBuilder) {
    this.getCharacters();
  }
  filter!: string;
  link!: string;
  linkTab: string[] = [];
  index = 1;
  info!: Info;
  characters!: SerialCharacter[];
  filterResult!: SerialCharacter[];
  min = 2;
  max = 34;

  FilterForm = this.fb.group({
    name: [''],
    status: [''],
    species: [''],
    gender: [''],
    type: [''],
  });

  ngOnInit(): void {
  }

  getFilter(e) {
    this.filter = (e.target.value).toLowerCase();
    return this.filter;
  }

  getCharacters(): void {
    this.searchService.getPagination(Math.floor(Math.random() * (this.max - this.min + 1)) + this.min).subscribe(response => {
      this.info = response.info;
      this.characters = response.results;
    }, error => {
      console.log(error);
    });
  }

  createLink(e) {
    console.log(e.target.name)
    switch (e.target.name) {
      case "name": {
        console.log("robi sie");
        this.linkTab.splice(0, 1, `${e.target.name}=${e.target.value}`)
        break;
      }
      case "status": {
        this.linkTab.splice(1, 1, `${e.target.name}=${e.target.value}`)
        break;
      }
      case "species": {
        this.linkTab.splice(2, 1, `${e.target.name}=${e.target.value}`)
        break;
      }
      case "type": {
        this.linkTab.splice(3, 1, `${e.target.name}=${e.target.value}`)
        break;
      }
      case "gender": {
        this.linkTab.splice(4, 1, `${e.target.name}=${e.target.value}`)
        break;
      }
    }
  }

  findHero() {
    this.link = `/${this.filter}/?${this.linkTab[0]}&${this.linkTab[1]}&${this.linkTab[2]}&${this.linkTab[3]}&${this.linkTab[4]}`
    this.searchService.filterHero(this.link).subscribe(response => {
      this.filterResult = response.results;
      console.log(this.filterResult);
    },
      error => {
        console.log(error);
      })
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

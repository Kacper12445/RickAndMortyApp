import { Component, OnInit } from '@angular/core';
import { SerialCharacter } from 'src/app/shared/models/character';
import { Info, Pagination } from 'src/app/shared/models/Pagination';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SearchService } from 'src/app/shared/services/search.service';
import { AlertService } from 'ngx-alerts';




@Component({
  selector: 'app-searching-page',
  templateUrl: './searching-page.component.html',
  styleUrls: ['./searching-page.component.sass']
})
export class SearchingPageComponent implements OnInit {

  searchText;

  constructor(public authService: AuthService, public searchService: SearchService, private alertService: AlertService) {
    this.getCharacters();
  }

  filter!: string;
  link!: string;
  linkTab: string[] = [];
  index = 1;
  info!: Info;
  characters!: SerialCharacter[];
  filterResult!: SerialCharacter[];
  LibId : number[] = [];
  existId!: boolean;
  min = 2;
  max = 34;

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
    switch (e.target.name) {
      case "name": {
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
    this.link = `${this.linkTab[0]}&${this.linkTab[1]}&${this.linkTab[2]}&${this.linkTab[3]}&${this.linkTab[4]}`
    this.searchService.filterHero(this.searchService.heroUrl+this.link).subscribe(response => {
      this.filterResult = response.results;
      this.info = response.info;
      console.log(response.info);
      for(let i = 2; i <= this.info.pages; i++)
      {
        this.searchService.filterHero(`${this.searchService.heroUrl}page=${i}&${this.link}`)
        .subscribe(res => {
          this.filterResult = [...this.filterResult, ...res.results];
          this.info.next = res.info.next;
          console.log(this.filterResult)
          console.log(`${this.searchService.heroUrl}/page=${i}&${this.link}`);
        })
      }
    },
      error => {
        console.log(error);
      })
  }
  nextFoundPage(){

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

  getLibId(){
    this.searchService.getIdFromLib().subscribe(response => {
      this.LibId = response;
    })
  }

  ifExist(Id: number){
    this.getLibId();
    console.log(this.LibId);
    console.log(Id);
    return (this.LibId.includes(Id))? true: false;
  }

  addToLibrary(e){
    const libObserver = {
      next: x => {
        this.alertService.success('Added');
      },
      error: err => {
        console.log(err);
        this.alertService.danger('Deleted')
      }
    };
    this.searchService.sendToLibrary(e.id, this.ifExist(e.id)).subscribe(libObserver);
    }

}

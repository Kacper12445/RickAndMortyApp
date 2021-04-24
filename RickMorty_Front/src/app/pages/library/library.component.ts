import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/shared/services/search.service';
import { SerialCharacter } from 'src/app/shared/models/character';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.sass']
})
export class LibraryComponent implements OnInit {

  libHeroes: SerialCharacter[] = [];
  searchText!: string;
  filter!: string;

  constructor(public searchService: SearchService, public authService: AuthService, private alertService: AlertService) {

  }

  ngOnInit(): void {
    this.makeLibLink();
  }

  deleteHero(hero){
    const deleteObserver = {
      next: x => {
        this.alertService.success('Deleted');
      },
      error: err => {
        this.alertService.danger('Already Deleted')
      }
    };

    this.libHeroes = this.libHeroes.filter( e => e !== hero);
    this.searchService.sendToLibrary(hero.id, true).subscribe(deleteObserver);
  }


  makeLibLink(){
    this.searchService.getLibId();
    return this.searchService.getLibHero(this.searchService.libId.join()).subscribe(response => {
      this.libHeroes = response;
    }, error => {
      console.log(error);
    });
  }


}

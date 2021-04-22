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
  libId: number[] = [];
  libHeroes: SerialCharacter[] = [];
  searchText!: string;
  filter!: string;

  constructor(public searchService: SearchService, public authService: AuthService, private alertService: AlertService) {
    this.getLibId();
  }

  ngOnInit(): void {

  }

  getLibId(){
   return this.searchService.getIdFromLib().subscribe(response => {
      this.libId = response;
    })
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

    this.libHeroes.splice(this.libHeroes.indexOf(hero.id), 1);
    this.makeLibLink();
    this.searchService.sendToLibrary(hero.id, true).subscribe(deleteObserver);
    }


  makeLibLink(){
    this.getLibId();
    return this.searchService.getLibHero(this.libId.join()).subscribe(response => {
      this.libHeroes = response;
    }, error => {
      console.log(error);
    });
  }


}

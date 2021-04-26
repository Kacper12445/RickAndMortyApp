import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/shared/services/search.service';
import { SerialCharacter } from 'src/app/shared/models/character';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AlertService } from 'ngx-alerts';
import { timer } from 'rxjs';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.sass']
})
export class LibraryComponent implements OnInit {


  // libHeroes - tablica przechowująca bohaterów dodanych biblioteki pobranych z web Api
  // searchText - zmienna używana do wyszukiwania bohaterów danej strony
  libHeroes: SerialCharacter[] = [];
  searchText!: string;

  constructor(public searchService: SearchService, public authService: AuthService, private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.refreshHeroes();

  }

  //Funkcja realizująca usuwanie bohatera z biblioteki, drugi argument funkcji sendToLibrary jest ustawiony na true co oznacza ze funkcja sendToLibary usunie obiekt zamiast wysyłać żądania o ponowne dodanie (oraz zwrócenie błędu)
  deleteHero(hero){
    const deleteObserver = {
      next: x => {
        this.alertService.success('Deleted');
      },
      error: err => {
        console.log(err);
        this.alertService.danger('Something went wrong')
      }
    };

    this.libHeroes = this.libHeroes.filter( e => e !== hero);   //Usunięcie z html na bieżąco
    this.searchService.sendToLibrary(hero.id, true).subscribe(deleteObserver);
  }

// Funkcja, która wysyła żądanie za pomocą wywołania funkcji getLibHero a następnie przypisuje rezultat operacji do tablicy bohaterów
  makeLibLink(){
    this.searchService.getLibId();
    this.searchService.getLibHero(this.searchService.libId.join()).subscribe(response => {
      this.libHeroes = response;
    }, error => {
      console.log(error);
    });
  }

  //Aktualizowanie listy bohaterów
  refreshHeroes(){
    timer(500).subscribe(() => {
      this.makeLibLink();
    })
  }


}

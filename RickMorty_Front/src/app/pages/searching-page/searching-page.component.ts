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

/**
 * max -zmienna przechowujaca maksymalny numer strony pobierany z webAPI
 * min -zmienna przechowujaca minimalny numer strony pobierany z webAPI
 * findUrl - link używany do wysysylania zapytania o wyszukanie bohatera w webApi
 * filter - zmienna przechowujaca kategoria według której był wyszukiwany bohater (lokalizacja, odcinek, dane bohatera)
 * index - zmienna przechowujaca numer strony na ktorej obecnie jestesmy, uzywany do zmiany strony w wyszukiwaniu bohaterow
 * info / characters - zmienne do ktorych przypisywane sa strony pobierane z webApi
 * linkTab - tablica w ktorej przechowywana jest część linku (dana bohatera wedlug ktorej jest wyszukiwany)
 * filterResult - tablica przetrzymujaca bohaterow bedacych wynikiem wyszukiwania
 * name - zmienna przechowująca wartość inputa o nazwie name
 * species - zmienna przechowująca wartość inputa o nazwie species
 * gender - zmienna przechowująca wartość inputa o nazwie gender
 * status - zmienna przechowująca wartość inputa o nazwie status
 * type - zmienna przechowująca wartość inputa o nazwie type
 */

  filter!: string;
  linkTab: string[] = [];
  index = 1;
  info!: Info;
  characters!: SerialCharacter[];
  filterResult!: SerialCharacter[];
  min = 1;
  max = 34;
  findUrl = this.searchService.heroUrl + '/?';
  name!: string;
  species!: string;
  gender!: string;
  status!: string;
  type!: string;

  constructor(public authService: AuthService, public searchService: SearchService, private alertService: AlertService) {
    this.getCharacters();
    this.searchService.getLibId();
  }

  ngOnInit(): void {
  }

  /**
   * Funkcja sprawdzająca wybrana kategorie wyszkiwania bohatera serialu. Używana w pliku html aby wyświetlić dane pola wybranej kategorii
  */
  getFilter(e) {
    this.filter = (e.target.value).toLowerCase();
    return this.filter;
  }


  /**
   * Funkcja w ktorej wysylamy zapytanie o numer strony (losowy po kazdym odświeżeniu) oraz przypisanie odpowiedzi do zmiennych - characters to
   * bohaterowie danej strony wyświetlanie w html. Zapytanie jest wysyłane za pomocą wywołania funkcji getPagination
  */
  getCharacters(): void {
    this.searchService.getPagination(Math.floor(Math.random() * (this.max - this.min + 1)) + this.min).subscribe(response => {
      this.info = response.info;
      this.characters = response.results;
    }, error => {
      console.log(error);
    });
  }


/**Funkcja tworzy część linku potrzebną aby wyszukiwanie przebiegło pomyślnie. W momencie wpisania w dane pole wyszukiwania wartości , jest ona
 * przypisana w dane miejsce w tablicy, które w innej funkcji jest wykorzystywane jako link Url w celu wysłania zapytania o bohatera na podstawie
 * wpisanych przez nas danych. Splice w tablicy jest używany aby każde wartość danego pola była tylko jedna a zmiana na inną spowoduje nadpisanie
 * wcześniejszej. Wynik funkcji jest zpisywany w zmiennej linkTab
*/
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


  /**
   * Funkcja wyszukująca bohaterów na podstawie danych zgromadzonych z poprzednio opisanych funkcji np. createLink. Zapytanie wysyłane za pomocą
   * wywołania funkcji filterHero
  */
  findHero() {
    const link = `${this.linkTab[0]}&${this.linkTab[1]}&${this.linkTab[2]}&${this.linkTab[3]}&${this.linkTab[4]}`
    this.searchService.filterHero(this.findUrl+link).subscribe(response => {
      this.filterResult = response.results;
      this.info = response.info;
      console.log(response.info);
      for(let i = 2; i <= this.info.pages; i++)
      {
        this.searchService.filterHero(`${this.findUrl}page=${i}&${link}`)
        .subscribe(res => {
          this.filterResult = [...this.filterResult, ...res.results];
          this.info.next = res.info.next;
          console.log(this.filterResult)
          console.log(`${this.searchService.heroUrl}/?page=${i}&${link}`);
        })
      }
    },
      error => {
        console.log(error);
      })
  }


/**Funkcja odpowiedzialna za zmianę stron . Wszyscy bohaterowie serialu są podzieleni na 34 strony. Funkcja getPagination zwraca nam jedną z nich
 * o indeksie podanych jako argument. Przy pierwszym wywołaniu jest to numer losowy , jednakże przy użyciu tej funkcji możemy zmieniać strony za
 * pomocą strzałek w html.Gdy strona będzie miała 35 indeks to zwracamy do początku natomiast gdy strona będzie miała 0 indeks to przenosimy się
 * na ostatnią stronę
*/
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
  }


  /**
   * Funkcja informująca nas czy Id podane w argumencie funkcji znajduje się w tablicy id bohaterów dodanych do biblioteki.
  */
  ifExist(Id){
    return (this.searchService.libId.includes(Id))? true: false;
  }


  /**
   * Funkcja w głównej mierze polega na funkcji sendToLibrary która wysyła żądanie o dodanie lub usunięcie bohatera z biblioteki. Jeśli bohater
   * już się w niej znajduje to jest on z niej usuwany natomiast jeśli się w niej nie znajduje to zostaje dodany. O tym czy zostanie usunięty czy
   * dodany decyduje funkcja ifExist zwracająca odpowiedź czy taki bohater już istnieje w bibliotece
   *
  */
  addToLibrary(hero){
    const libObserver = {
      next: x => {
        this.alertService.success('Operation done');
      },
      error: err => {
        console.log(err);
        this.alertService.danger('Error')
      }
    };
    this.searchService.sendToLibrary(hero.id, this.ifExist(hero.id)).subscribe(libObserver);
    }


  /**
   * Funkcja usuwająca wartość z pola input
  */
  cleanInput(){
    this.name = '';
    this.gender = '';
    this.species = '';
    this.type = '';
    this.status = '';
  }

/**
 * Funkcja powodująca wyczyszczenie pól input a następnie zastąpienie strony z rezultatu wyszkiwań na losową strone bohaterów z web Api
 * */
  cleanSearching(){
    this.linkTab.length = 0;
    this.cleanInput();
    this.getCharacters();

  }

}

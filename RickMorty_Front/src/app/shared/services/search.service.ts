import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { SerialCharacter } from '../models/character';
import { Pagination } from '../models/Pagination';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  libraryCharacter: SerialCharacter[] = [];
  rmUrl = environment.RickAndMortyUrl;
  heroUrl = this.rmUrl + 'character';
  constructor(private httpClient: HttpClient) { }

  getHero(): Observable<SerialCharacter> {
    return this.httpClient.get<SerialCharacter>(this.heroUrl);
  }

  getPagination(index: number = 1): Observable<Pagination> {
    return this.httpClient.get<Pagination>(this.heroUrl + `/?page=${index}`);
  }


  filterHero(link: string) {
    console.log(link);
    return this.httpClient.get<Pagination>(this.rmUrl + link)
  }


  addToLibrary(e) {
    //sprawdzanie po end poincie czy jest w bibliotece jeslit ak to dodac jesli nie to usunac

    console.log("Dodano do biblioteki");
    console.log(e);

    this.libraryCharacter.push(e);
    console.log(this.libraryCharacter);

  }


}








  // hero() {
  //   this.getHero().subscribe((data: serialCharacter) => this.character = {
  //     name: data.name,
  //     status: data.status,
  //     gender: data.gender,
  //     species: data.species,
  //     location: data.location,
  //     imgUrl: data.imgUrl
  //     // episodes: [data.episode]
  //   });
  // }

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

  rmUrl = environment.RickAndMortyUrl;

  constructor(private httpClient: HttpClient) { }

  getHero(): Observable<SerialCharacter> {
    return this.httpClient.get<SerialCharacter>(this.rmUrl + 'character');
  }

  getPagination(): Observable<Pagination> {
    return this.httpClient.get<Pagination>(this.rmUrl + 'character');
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
}

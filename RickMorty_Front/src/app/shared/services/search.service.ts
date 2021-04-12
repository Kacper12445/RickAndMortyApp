import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { serialCharacter } from '../models/character';
import { IPagination } from '../models/IPagination';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  rmUrl = environment.RickAndMortyUrl;
  // character: serialCharacter = {
  //   name: '',
  //   status: '',
  //   gender: '',
  //   species: '',
  //   location: '',
  //   imgUrl: '',
  //   // episodes: []
  // }
  constructor(private httpClient: HttpClient) { }

  getHero(): Observable<serialCharacter> {
    return this.httpClient.get<serialCharacter>(this.rmUrl + 'character');
  }

  getPagination(): Observable<IPagination> {
    return this.httpClient.get<IPagination>(this.rmUrl);
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

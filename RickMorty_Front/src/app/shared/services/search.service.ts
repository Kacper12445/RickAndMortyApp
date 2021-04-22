import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { SerialCharacter } from '../models/character';
import { Pagination } from '../models/Pagination';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  libraryCharacter!: SerialCharacter;
  rmUrl = environment.RickAndMortyUrl;
  heroUrl = this.rmUrl + 'character';
  libUrl = environment.LibraryUrl;

  constructor(private httpClient: HttpClient) {
  }

  getPagination(index: number = 1): Observable<Pagination> {
    return this.httpClient.get<Pagination>(this.heroUrl + `/?page=${index}`);
  }

  filterHero(link: string) {
      return this.httpClient.get<Pagination>(link )

  }

  sendToLibrary(Id:number, ExistInLib: boolean) {
  let headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
    });
    let options = { headers: headers };

    if(ExistInLib === false){
      console.log("dodano do biblioteki")
      console.log(ExistInLib);
      return this.httpClient.post(this.libUrl, JSON.stringify({id: Id}), options);

    }
    else{
      console.log("Usunięto z biblioteki");
      return this.httpClient.delete(this.libUrl + `${Id}`, options);
    }
  }

  getLibHero(idArray):Observable<Array<SerialCharacter>>{
    console.log(`${this.heroUrl}${idArray}`);
    return this.httpClient.get<Array<SerialCharacter>>(`${this.heroUrl}/${idArray}`);
  }

  getIdFromLib(): Observable<Array<number>>{
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    })
    let options = { headers: headers };
    return this.httpClient.get<Array<number>>(this.libUrl, options);
  }

}

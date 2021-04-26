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

  //libraryCharacter - tablica obiektów typu SerialCharacter w której przechowywani są bohaterowie serialu dodani do biblioteki
  // rmUrl - link do webApi
  // heroUrl - link do webApi wyszczegółowiony do kategorii bohaterów
  // libUrl - link do api serwera do którego wysyłane są żądania operacji związanych z biblioteką
  // libId - tablica w której przechowywane są Id bohaterów, którzy są dodani do biblioteki

  // libraryCharacter!: SerialCharacter;
  rmUrl = environment.RickAndMortyUrl;
  heroUrl = this.rmUrl + 'character';
  libUrl = environment.LibraryUrl;
  libId: number[] = [];

  constructor(private httpClient: HttpClient) {
  }


  //Funkcja wysyłająca żadanie o dany numer strony bohaterów , jeśli nie podamy nic w argumencie to zwrócona będzie pierwsza strona
  getPagination(index: number = 1): Observable<Pagination> {
    return this.httpClient.get<Pagination>(this.heroUrl + `/?page=${index}`);
  }

  //Funkcja wysyłająca żądanie o wyszukiwanie, które jest podane w linku
  filterHero(link: string) {
      return this.httpClient.get<Pagination>(link )

  }

  // Wysyłanie do end pointa Serwera żądania o dodanie bądź usunięcie bohatera z biblioteki. W żądaniu wymagane jest bycie zalogowanym
  sendToLibrary(Id:number, ExistInLib: boolean) {
  let headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
    });
    let options = { headers: headers };

    if(ExistInLib === false){
      this.libId.push(Id);  //dodawanie bohaterów do tablicy na biężąco
      return this.httpClient.post(this.libUrl, JSON.stringify({id: Id}), options);

    }
    else{
      this.libId = this.libId.filter( e => e !== Id);  //usuwanie bohaterów z tablicy na biężąco
      return this.httpClient.delete(this.libUrl + `${Id}`, options);
    }
  }


  //Funkcja wysyłająca żądanie o bohaterów, których id znajdują sie w bibliotece
  getLibHero(idArray):Observable<Array<SerialCharacter>>{
    return this.httpClient.get<Array<SerialCharacter>>(`${this.heroUrl}/${idArray}`);
  }

  // Funkcja wysyłająca żądanie do serwera o Id bohaterów znajdujących się w bibliotece
  getIdFromLib(): Observable<Array<number>>{
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    })
    let options = { headers: headers };
    return this.httpClient.get<Array<number>>(this.libUrl, options);
  }


  //Funkcja przypisująca wynik żądania funkcji getIdFromLib do tablicy
  getLibId(){
    return this.getIdFromLib().subscribe(response => {
       this.libId = response;
     })
   }


}

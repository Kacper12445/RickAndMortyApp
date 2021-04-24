import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt'
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  helper = new JwtHelperService();
  token;
  apiUrl: string = environment.apiUrl;


  constructor(private http: HttpClient, private router: Router) { }

  // Funkcja pozwalajaca uzytkownikowi sie zalogowac. Argument model przechowuje wartosci pól, które zostały wypełnione przez użytkownika
  // Funkcja wysyła zapytanie post do end pointa odpowiedzialnego za logowanie.
  // Jeśli w bazie danych istnieje użytkownik o dane, którymi zostały wypełnione pola to zostają nam odsyłana odpowiedź w postaci: 'username' oraz 'token'
  // W funkcji wartości zwrócone przez serwer są mapowane do tymczasowej zmiennej user a następnie token zwrócony zostaje zapisany w pamięci lokalnej przeglądarki.
  login(model: any) {
    return this.http.post(this.apiUrl + 'login', model).pipe(
      map((user: any) => {
        if (user) {
          localStorage.setItem('token', user.token)
        }
      })
    )
  }

// Funkcja wysyła dane zebrane z formularza rejestracji i wysyła do endpointa odpowiedzialnego za rejestrację użytkownika. Jeśli dane są zgodne z pewnymi ustalonymi regułami (np. ilość znaków) to zostaje wysłany mail na podany adres email gdzie musimy go potwierdzić. Gdy już to zrobimy konto staje się aktywne.
  register(model: any) {
    console.log(model);
    let headers = new HttpHeaders({
      'confirmEmailUrl': this.apiUrl + 'confirm-email'
    });
    let options = { headers: headers };
    return this.http.post(this.apiUrl + 'register', model, options);
  }


  //Funkcja sprawdza czy token znajdujący się w pamięci lokalnej zapisany podczas poprawnego logowanie wygasł. Jeśli nie wygasł to użytkownik jest zalogowany
  loggedIn() {
    this.token = localStorage.getItem('token');
    return !this.helper.isTokenExpired(this.token);
  }

  // Funkcja przyjmująca argument typu string. W rzeczywistości jest to końcówka linky/ route do którego chcemy się przenieść
  changePage(path: string) {
    this.router.navigateByUrl(path);
  }
}



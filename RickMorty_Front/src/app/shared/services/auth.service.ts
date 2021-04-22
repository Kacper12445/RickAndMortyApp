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

  login(model: any) {
    console.log(model);
    return this.http.post(this.apiUrl + 'login', model).pipe(
      map((user: any) => {
        if (user) {
          localStorage.setItem('token', user.token)
        }
      })
    )
  }
  register(model: any) {
    console.log(model);
    let headers = new HttpHeaders({
      'confirmEmailUrl': this.apiUrl + 'confirm-email'
    });
    let options = { headers: headers };
    return this.http.post(this.apiUrl + 'register', model, options);
  }

  loggedIn() {
    this.token = localStorage.getItem('token');
    return !this.helper.isTokenExpired(this.token);
  }
  changePage(path: string) {
    this.router.navigateByUrl(path);
  }
}



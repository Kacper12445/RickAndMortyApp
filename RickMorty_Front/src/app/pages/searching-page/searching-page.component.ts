import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-searching-page',
  templateUrl: './searching-page.component.html',
  styleUrls: ['./searching-page.component.sass']
})
export class SearchingPageComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }



  onSubmit(f: NgForm) {
    const searchObserver = {
      next: x => {
        console.log('Udalo sie');
      },
      error: err => {
        console.log(err);
      }
    }
    this.authService.getHero(f.value).subscribe(searchObserver);
    console.log(searchObserver);
  }

}

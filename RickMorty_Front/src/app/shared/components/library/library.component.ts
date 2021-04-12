import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { IPagination } from '../../models/IPagination';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.sass']
})
export class LibraryComponent implements OnInit {

  // pagination: IPagination;
  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
  }

  // Pagination() {
  //   this.searchService.getPagination().subscribe(data => this.pagination = {
  //     info.count: data.count,
  //     info.pages: data.pages,
  //     info.next: data.next,
  //     info.prev: data.prev,



  //   })
  // }

}

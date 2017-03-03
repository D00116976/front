import { Component, OnInit, Input } from '@angular/core';
import {PaginationPage, PaginationPropertySort} from '../pagination'
import {Table} from '../table';
import {showLoading, hideLoading, doNothing} from "../commons"
import * as Rx from "rxjs/Rx";


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
	
  constructor() { }

  ngOnInit() {
  }

  search(search)
  {
  	console.log(search);
  	
  }
}

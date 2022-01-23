import {AfterViewInit, Component, OnInit} from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit, AfterViewInit {

  constructor(private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.spinner.hide().then();
  }
}

import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  constructor(private spinner: NgxSpinnerService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.spinner.hide().then();
  }
}

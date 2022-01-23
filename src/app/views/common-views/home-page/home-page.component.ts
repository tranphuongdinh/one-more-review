import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { fadeIn, fadeOut } from '../../animations';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { User } from 'src/app/models/user';
import { ProfileService } from 'src/app/services/profile.service';
import { ToastrService } from 'ngx-toastr';
import { FilmService } from 'src/app/services/film.service';
import { Movie } from 'src/app/models/movie';
import { GENRES, NATIONS, YEARS } from 'src/app/utils/constants';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  animations: [fadeIn, fadeOut],
})
export class HomePageComponent implements OnInit, AfterViewInit {
  carouselItems!: any[];
  films!: Movie[];
  allFilms!: Movie[];

  page: number = 0;
  allPage: number = 0;
  filmPerPage: number = 8;

  types: any[] = GENRES;
  nations: any[] = NATIONS;
  years: any[] = YEARS;

  selectedType = '';
  selectedNation = '';
  selectedYear = '';

  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    public sanitizer: DomSanitizer,
    private toast: ToastrService,
    private filmService: FilmService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.filmService.getAllFilms().subscribe(
      (res) => {
        if (res) {
          this.allFilms = res.films;
          this.carouselItems = res.films;
          this.allPage =
            Math.floor(this.allFilms.length / this.filmPerPage) + 1;
          this.films = this.allFilms.slice(0, this.filmPerPage);
        }
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
        this.toast.error('ERROR LOADING DATA FROM SERVER');
      }
    );
  }

  ngAfterViewInit(): void {}

  onPickFilm(id: string) {
    this.router.navigate(['/films', id]);
  }

  onFilterMovie(selectedType: any, selectedNation: any, selectedYear: any) {
    this.router.navigate([`/filter-result`], {
      queryParams: {
        genre: selectedType,
        country: selectedNation,
        year: selectedYear,
      },
    });

    //Do stuff
  }

  onPrevPage() {
    if (this.page > 0) {
      this.page--;
      this.films = this.allFilms.slice(
        this.page * this.filmPerPage,
        this.page * this.filmPerPage + this.filmPerPage
      );
    }
  }

  onNextPage() {
    if (this.page < this.allPage - 1) {
      this.page++;
      this.films = this.allFilms.slice(
        this.page * this.filmPerPage,
        this.page * this.filmPerPage + this.filmPerPage
      );
      console.log(this.films);
    }
  }
}

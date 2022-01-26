import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { fadeIn, fadeOut } from '../../animations';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Movie } from 'src/app/models/movie';
import { FilmService } from 'src/app/services/film.service';
import { ToastrService } from 'ngx-toastr';
import { NATIONS, GENRES, YEARS } from 'src/app/utils/constants';

@Component({
  selector: 'app-filter-result',
  templateUrl: './filter-result.component.html',
  styleUrls: ['./filter-result.component.scss'],
})
export class FilterResultComponent implements OnInit, AfterViewInit {
  genres: any[] = GENRES;
  nations: any[] = NATIONS;
  years: any[] = YEARS;

  selectedProperty = {
    type: '',
    year: '',
    nation: '',
  };

  selectedGenre!: any;
  selectedNation!: any;
  selectedYear!: any;
  selectedName: string = '';

  tempType!: any;
  tempNation!: any;
  tempYear!: any;

  films!: Movie[];
  allFilms!: Movie[];
  page: number = 0;
  allPage: number = 0;
  filmPerPage: number = 8;
  isFound: boolean = true;

  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    public sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private filmService: FilmService,
    private toast: ToastrService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.selectedGenre = params['genre'] || '';
      this.selectedNation = params['country'] || '';
      this.selectedYear = params['year'] || '';
      this.selectedName = params['name'] || '';

      this.tempNation = this.selectedNation;
      this.tempType = this.selectedGenre;
      this.tempYear = this.selectedYear;
    });
  }

  getFilmsByFilter() {
    this.spinner.show();
    this.filmService.getAllFilms().subscribe(
      (res) => {
        this.allFilms = res.films.reverse();
        if (this.selectedName) {
          this.allFilms = this.allFilms.filter((film: Movie) => {
            return (
              film.name.toLowerCase().includes(this.selectedName) ||
              film.eng_name.toLowerCase().includes(this.selectedName)
            );
          });
        }

        if (this.selectedGenre) {
          this.allFilms = this.allFilms.filter((film: Movie) => {
            return film.gene.includes(this.selectedGenre);
          });
        }

        if (this.selectedNation) {
          this.allFilms = this.allFilms.filter((film: Movie) => {
            return film.country.includes(this.selectedNation);
          });
        }

        if (this.selectedYear) {
          this.allFilms = this.allFilms.filter((film: Movie) => {
            if (this.selectedYear.includes('<'))
              return (
                film.year < Number.parseInt(this.selectedYear.substring(1))
              );
            else return film.year === Number.parseInt(this.selectedYear);
          });
        }

        this.allPage = Math.floor(this.allFilms.length / this.filmPerPage) + 1;
        this.films = this.allFilms.slice(0, this.filmPerPage);
        if (this.allFilms.length === 0) this.isFound = false;
        this.spinner.hide().then();
      },
      (err) => {
        this.spinner.hide().then();
        this.isFound = false;
      }
    );
  }

  ngOnInit(): void {
    this.spinner.show();
    this.getFilmsByFilter();
  }

  ngAfterViewInit(): void {}

  onPickFilm(id: string) {
    this.router.navigate(['/films', id]);
  }

  onFilterMovie(tempType: any, tempNation: any, tempYear: any) {
    this.selectedGenre = tempType || '';
    this.selectedNation = tempNation || '';
    this.selectedYear = tempYear || '';

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([`/filter-result`], {
        queryParams: {
          genre: tempType,
          country: tempNation,
          year: tempYear,
        },
      })
    );
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
    }
  }

  backToHome() {
    this.router.navigate(['/']);
  }
}

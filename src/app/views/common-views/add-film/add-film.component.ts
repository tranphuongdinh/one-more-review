import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Movie } from 'src/app/models/movie';
import { FilmService } from 'src/app/services/film.service';
import { UserService } from 'src/app/services/user.service';
import { NATIONS, TYPES, YEARS, GENRES, STATUS } from 'src/app/utils/constants';

@Component({
  selector: 'app-add-film',
  templateUrl: './add-film.component.html',
  styleUrls: ['./add-film.component.scss'],
})
export class AddFilmComponent implements OnInit {
  types: any[] = TYPES;
  nations: any[] = NATIONS;
  years: any[] = YEARS;
  genres: any[] = GENRES;
  statuses: any[] = STATUS;

  isSubmitted: boolean = false;

  films!: Movie[];
  filmName: string = '';
  selectedGenre: string = '';
  selectedNation: string = '';
  selectedYear: number = 0;
  selectedType: string = '';
  duration: string = '';
  directors: string = '';
  description: string = '';
  actors: string = '';
  status: string = '';
  reviewChannel: string = '';
  trailer: string = '';
  poster: string = '';
  img: string = '';
  url: string = '';
  avgRating: number = 1;

  constructor(
    private spinner: NgxSpinnerService,
    private sanitizer: DomSanitizer,
    private filmService: FilmService,
    private toast: ToastrService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.spinner.hide().then();
    const id = localStorage.getItem('USER_ID') || '';
    this.userService.getUser(id).subscribe((res) => {
      if (!res.user.isAdmin) this.router.navigate(['/']);
    });
  }

  onSubmit(): void {
    this.isSubmitted = true;

    const item: any = {
      avgRating: this.avgRating || 1,
      name: this.filmName || '',
      gene: this.selectedGenre || '',
      country: this.selectedNation || '',
      year: this.selectedYear || 0,
      type: this.selectedType === 'Phim chiếu rạp' ? true : false || true,
      duration: this.duration || '',
      directors: this.directors || '',
      description: this.description || '',
      actors: this.actors || '',
      status: this.status || '',
      reviewChannel: this.reviewChannel || '',
      trailer: this.trailer || '',
      poster: this.poster || '',
      img: this.img || '',
      url: this.url || '',
    };

    if (this.isValid()) {
      this.filmService.postFilm(item).subscribe(
        (data: any) => {
          this.toast.success('Thêm phim thành công');
					this.onReset();
        },
        (error) => {
          this.toast.error('Thêm phim thất bại');
        }
      );
    }
  }

  onReset(): void {
    this.isSubmitted = false;

    this.filmName = '';
    this.selectedGenre = '';
    this.selectedNation = '';
    this.selectedYear = 0;
    this.selectedType = '';
    this.duration = '';
    this.directors = '';
    this.description = '';
    this.actors = '';
    this.status = '';
    this.reviewChannel = '';
    this.trailer = '';
    this.poster = '';
    this.img = '';
    this.url = '';
  }

  isValid(): boolean {
    const item: any = {
      name: this.filmName || '',
      genre: this.selectedGenre || '',
      nation: this.selectedNation || '',
      year: this.selectedYear || '',
      type: this.selectedType || '',
      duration: this.duration || '',
      directors: this.directors || '',
      description: this.description || '',
      actors: this.actors || '',
      status: this.status || '',
      reviewChannel: this.reviewChannel || '',
      trailer: this.trailer || '',
      poster: this.poster || '',
      img: this.img || '',
      url: this.url || '',
    };

    const keys = Object.keys(item);

    for (let key of keys) {
      if (key === 'description') {
        if (item[key].toString().trim().length < 50) {
          return false;
        }
      }
      if (key === 'duration') {
        if (this.parseInt(item[key]) <= 0) {
          return false;
        }
      } else {
        if (item[key].toString().trim().length === 0) {
          return false;
        }
      }
    }

    return true;
  }

  parseSafeResourceUrl(value: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(value);
  }

  parseInt(value: string): number {
    return Number.parseInt(value);
  }

  strLength(value: string): number {
    return value?.trim().length;
  }
}

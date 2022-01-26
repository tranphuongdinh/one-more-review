import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Movie } from 'src/app/models/movie';
import { FilmService } from 'src/app/services/film.service';
import { NATIONS, TYPES, YEARS, GENRES, STATUS } from 'src/app/utils/constants';
import { ConfirmationService } from 'primeng/api';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-film',
  templateUrl: './edit-film.component.html',
  styleUrls: ['./edit-film.component.scss'],
  providers: [ConfirmationService],
})
export class EditFilmComponent implements OnInit {
  types: any[] = TYPES;
  nations: any[] = NATIONS;
  years: any[] = YEARS;
  genres: any[] = GENRES;
  statuses: any[] = STATUS;

  film!: Movie;

  isSubmitted: boolean = false;

  films!: Movie[];
  name: string = '';
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
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.spinner.show();

    this.spinner.hide().then();
    const id = localStorage.getItem('USER_ID') || '';
    this.userService.getUser(id).subscribe((res) => {
      if (!res.user.isAdmin) this.router.navigate(['/']);
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id') || '';
      this.filmService.getFilm(id).subscribe(
        (data: any) => {
          this.film = data.film;

          this.name = this.film.name;
          this.selectedGenre = this.film.gene;
          this.selectedNation = this.film.country;
          this.selectedYear = this.film.year;
          this.selectedType = this.film.type ? 'Phim chiếu rạp' : 'Phim bộ';
          this.duration = this.film.duration;
          this.directors = this.film.directors;
          this.description = this.film.description;
          this.actors = this.film.actors;
          this.status = this.film.status;
          this.reviewChannel = this.film.reviewChannel;
          this.trailer = this.film.trailer;
          this.poster = this.film.poster;
          this.img = this.film.img;
          this.url = this.film.url;
          this.avgRating = this.film.avgRating;

          this.spinner.hide();
        },
        (error) => {
          this.toast.error("Có lỗi xảy ra");
          this.spinner.hide();
        }
      );
    });
  }

  confirm(event: Event) {
    this.confirmationService.confirm({
      target: event.target || undefined,
      message: 'Xác nhận xóa phim này?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.spinner.show();
        this.filmService.deleteFilm(this.film._id).subscribe(
          (res) => {
            this.toast.success('Xóa phim thành công');
            this.spinner.hide();
            this.router.navigate(['/']);
          },
          (error) => {
            this.toast.error(`${'Xóa phim thất bại'}`);
            this.spinner.hide();
          }
        );
      },
      reject: () => {
        //reject action
      },
    });
  }

  onSubmit(event: any): void {
    event.preventDefault();
    this.isSubmitted = true;

    const item: any = {
      avgRating: this.avgRating || 1,
      name: this.name || '',
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
      this.spinner.show();
      this.filmService.updateFilm(item, this.film._id).subscribe(
        (data: any) => {
          this.toast.success('Cập nhật phim thành công');
          this.spinner.hide();
					this.router.navigate(['/films', this.film._id]);
        },
        (error) => {
          this.toast.error(`${'Cập nhật phim thất bại'}`);
        }
      );
    }
  }

  onReset(): void {
    this.isSubmitted = false;

    this.name = '';
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
    this.avgRating = 1;
  }

  isValid(): boolean {
    const item: any = {
      name: this.name || '',
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
        if (item[key].toString().trim().length < 100) {
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

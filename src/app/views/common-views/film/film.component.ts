import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Movie } from 'src/app/models/movie';
import { FilmService } from 'src/app/services/film.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommentService } from 'src/app/services/comment.service';
import { ReviewService } from 'src/app/services/review.service';
import { User } from 'src/app/models/user';
import { ProfileService } from 'src/app/services/profile.service';
import { ConfirmationService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss'],
  providers: [ConfirmationService],
})
export class FilmComponent implements OnInit {
  film!: Movie;
  comments: any[] = [];
  reviews: any[] = [];
  iframeUrl!: SafeResourceUrl;

  yourComment: string = '';
  yourReview: string = '';
  reviewScore: number = 1;
  userInfo!: User;
  userId = localStorage.getItem('USER_ID');

  editReviewDialog: boolean = false;
  editReviewText: string = '';
  editReviewId: string = '';
  editReviewScore: number = 1;

  editCommentDialog: boolean = false;
  editCommentText: string = '';
  editCommentId: string = '';

  constructor(
    private filmService: FilmService,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private sanitizer: DomSanitizer,
    private commentService: CommentService,
    private reviewService: ReviewService,
    private profileService: ProfileService,
    private confirmationService: ConfirmationService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    const userId = localStorage.getItem('USER_ID') || '';
    this.route.paramMap.subscribe((params) => {
      this.profileService.getProfile(userId).subscribe(
        (res) => {
          if (res) {
            this.userInfo = res.user;
          }
        },
        (err) => {
          this.toast.error('Có lỗi khi kết nối đến Server');
          this.spinner.hide();
        }
      );

      const id: string = params.get('id') || '';
      this.filmService.getFilm(id).subscribe(
        (res) => {
          this.film = res.film;
          this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            this.film.url
          );

          if (!this.film.commentList.length && !this.film.reviewList.length)
            this.spinner.hide();

          for (let commentId of this.film.commentList) {
            this.spinner.show();
            this.commentService.getComment(commentId).subscribe(
              (res) => {
                this.comments = [...this.comments, res.comment];
                this.spinner.hide().then();
              },
              (err) => {
                console.log(err);
                this.spinner.hide().then();
              }
            );
          }

          for (let reviewId of this.film.reviewList) {
            this.spinner.show();
            this.reviewService.getReview(reviewId).subscribe(
              (res) => {
                console.log(res);
                this.reviews = [...this.reviews, res.review];
                this.spinner.hide().then();
              },
              (err) => {
                console.log(err);
                this.spinner.hide().then();
              }
            );
          }
        },
        (err) => {
          this.spinner.hide();
          this.toast.error(`${'Tải phim thất bại:'} ${err.message}`);
          this.router.navigate(['/']);
        }
      );
    });
  }

  confirmDeleteFilm(event: Event) {
    this.confirmationService.confirm({
      target: event.target || undefined,
      message: 'Xác nhận xóa phim này?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.onDeleteFilm();
      },
      reject: () => {
        //reject action
      },
    });
  }

  confirmDeleteReview(event: Event, id: string) {
    this.confirmationService.confirm({
      target: event.target || undefined,
      message: 'Xác nhận xóa đánh giá này?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteReview(id);
      },
      reject: () => {
        //reject action
      },
    });
  }

  confirmDeleteComment(event: Event, id: string) {
    this.confirmationService.confirm({
      target: event.target || undefined,
      message: 'Xác nhận xóa bình luận này?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteComment(id);
      },
      reject: () => {
        //reject action
      },
    });
  }

  onEditFilm() {
    this.router.navigate(['/edit-film', this.film._id]);
  }

  onDeleteFilm() {
    this.spinner.show();
    this.filmService.deleteFilm(this.film._id).subscribe(
      (res) => {
        this.toast.success('Xóa phim thành công');
        this.spinner.hide();
        this.router.navigate(['/']);
      },
      (error) => {
        this.toast.error(`${'Xóa phim thất bại:'} ${error.message}`);
        this.spinner.hide();
      }
    );
  }

  postComment() {
    const data = {
      idFilm: this.film._id,
      content: this.yourComment,
    };

    if (this.countWords(data.content) >= 1 && data.content) {
      this.spinner.show().then();
      this.commentService.postComment(data).subscribe(
        (res) => {
          this.comments = [...this.comments, res.comment];
          this.yourComment = '';
          this.toast.success('Đăng bình luận thành công');
          this.spinner.hide().then();
        },
        (err) => {
          this.toast.error(`${'Đăng bình luận thất bại:'} ${err.message}`);
          this.spinner.hide().then();
        }
      );
    }
  }

  postReview() {
    const data = {
      rating: this.reviewScore.toString(),
      idFilm: this.film._id,
      content: this.yourReview,
    };

    if (this.countWords(data.content) >= 50 && data.content) {
      this.spinner.show().then();
      this.reviewService.postReview(data).subscribe(
        (res) => {
          console.log(res);
          this.reviews = [...this.reviews, res.review];
          this.yourReview = '';
          this.toast.success('Đánh giá phim thành công');
          this.spinner.hide().then();
        },
        (err) => {
          this.toast.success(`${'Đánh giá phim thất bại:'} ${err.message}`);
          this.spinner.hide().then();
        }
      );
    }
  }

  deleteReview(reviewId: string) {
    this.spinner.show().then();
    this.reviewService.deleteReview(reviewId).subscribe(
      (res) => {
        this.reviews = this.reviews.filter((review) => review._id !== reviewId);
        this.spinner.hide().then();
        this.toast.success('Xóa đánh giá thành công');
      },
      (err) => {
        this.spinner.hide().then();
        this.toast.error(`${'Xóa đánh giá thất bại:'} ${err.message}`);
      }
    );
  }

  deleteComment(commentId: string) {
    this.spinner.show().then();
    this.commentService.deleteComment(commentId).subscribe(
      (res) => {
        console.log(res);
        this.comments = this.comments.filter(
          (comment) => comment._id !== commentId
        );
        this.spinner.hide().then();
      },
      (err) => {
        console.log(err);
        this.spinner.hide().then();
      }
    );
  }

  onEditReview(review: any) {
    this.editReviewDialog = true;
    this.editReviewText = review.content;
    this.editReviewScore = review.rating;
    this.editReviewId = review._id;
  }

  onEditReviewSubmit() {
    if (this.countWords(this.editReviewText) >= 50 && this.editReviewText) {
      this.reviewService
        .updateReview(this.editReviewId, {
          content: this.editReviewText,
          rating: this.editReviewScore,
        })
        .subscribe(
          (res) => {
            this.reviews = this.reviews.map((review) =>
              review._id === this.editReviewId ? res.review : review
            );
            this.editReviewDialog = false;
            this.toast.success('Cập nhật đánh giá thành công');
          },
          (err) => {
            this.editReviewDialog = false;
            this.toast.error(`${'Cập nhật đánh giá thất bại:'} ${err.message}`);
          }
        );
    }
  }

  onEditComment(comment: any) {
    this.editCommentDialog = true;
    this.editCommentText = comment.content;
    this.editCommentId = comment._id;
  }

  onEditCommentSubmit() {
    if (this.countWords(this.editCommentText) >= 1 && this.editCommentText) {
      this.commentService
        .updateComment(this.editCommentId, { content: this.editCommentText })
        .subscribe(
          (res) => {
            this.comments = this.comments.map((comment) =>
              comment._id === this.editCommentId ? res.comment : comment
            );
            this.editCommentDialog = false;
            this.editCommentText = '';
            this.toast.success('Cập nhật bình luận thành công');
          },
          (err) => {
            this.editCommentDialog = false;
            this.editCommentText = '';
            this.toast.error(
              `${'Cập nhật bình luận thất bại:'} ${err.message}`
            );
          }
        );
    }
  }

  toDateTime(secs: number) {
    let t = new Date();
    t.setSeconds(secs);
    return t.toLocaleString();
  }

  countWords(str: string) {
    return str.trim().split(/\s+/).length;
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userInfo!: User;
  items!: any[];
  searchName: string = '';

  constructor(
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    public sanitizer: DomSanitizer,
    private profileService: ProfileService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((params) => {
      this.searchName = params['name'] || '';
    });
  }

  ngOnInit(): void {
    const id = localStorage.getItem('USER_ID') || '';
    this.profileService.getProfile(id).subscribe(
      (res) => {
        if (res) {
          this.userInfo = res.user;

          if (this.userInfo.isAdmin) {
            this.items.push({
              label: 'Thêm phim',
              icon: 'pi pi-video',
              url: '/add-film',
            });
            this.items.push({
              label: 'Thêm admin',
              icon: 'pi pi-user-plus',
              url: '/add-admin',
            });
          }

					this.items.push({
            label: 'Đăng xuất',
            icon: 'pi pi-sign-out',
            command: () => {
              this.authService.signOut();
            },
          });
        }
      },
      (err) => {
        this.spinner.hide();
        this.toast.error('Có lỗi khi kết nối đến server');
      }
    );

    this.items = [
      {
        label: 'Trang chủ',
        icon: 'pi pi-home',
        url: '/',
      },
      {
        label: 'Tài khoản',
        icon: 'pi pi-user-edit',
        url: '/profile',
      },
    ];
  }

  signOut(): void {
    this.authService.signOut();
  }

  onSearch() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([`/filter-result`], {
        queryParams: {
          name: this.searchName,
        },
      })
    );
  }

	onNavigateProfile() {
		this.router.navigate(['/profile']);
	}

  onType(event: any) {
    if (event.key === 'Enter' && this.searchName) {
      this.onSearch();
    }
  }
}

$(window).on('scroll', () => {
  const y = $(window).scrollTop();
  y || 0 > 100
    ? $('.header').addClass('header-scrolled')
    : $('.header').removeClass('header-scrolled');
});

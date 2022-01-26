import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss'],
})
export class AddAdminComponent implements OnInit {
  name: string = '';
  email: string = '';
  password: string = '';
  user!: User;
  isSubmitted: boolean = false;
  constructor(
    private spinner: NgxSpinnerService,
    private userService: UserService,
		private apiService: ApiService,
    private toast: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.spinner.hide().then();
    const id = localStorage.getItem('USER_ID') || '';
    this.userService.getUser(id).subscribe((res) => {
      if (!res.user.isAdmin) this.router.navigate(['/']);
    });
  }

  onSubmit(event: any): void {
    event.preventDefault();
    this.isSubmitted = true;
    if (this.name && this.email && this.password) {
			this.spinner.show().then();
      const data = {
        password: this.password,
        name: this.name,
        isAdmin: true,
        username: this.email,
      };

			this.apiService.signUp(data).subscribe( res => {
				if (res) {
					this.toast.success('Thêm admin thành công');
					this.spinner.hide().then();
				}
			}, err => {
				this.toast.error("Có lỗi xảy ra hoặc tài khoản admin đã tồn tại");
				this.spinner.hide().then();
			})
    }
  }

  onCancel() {
    this.isSubmitted = false;
    this.name = '';
    this.email = '';
    this.password = '';
  }
  length(value: string): number {
    return value?.trim().length;
  }
}

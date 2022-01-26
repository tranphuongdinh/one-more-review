import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Review } from 'src/app/models/review';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  constructor(
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    private userService: UserService
  ) {}
  editStatus: boolean = false;
  user!: any;
  id!: any;
  edit_age!: number;
  edit_country!: string;
  edit_gender!: boolean;
  edit_name!: string;
  edit_image!: string;

  ngOnInit(): void {
    this.id = localStorage.getItem('USER_ID');
    this.userService.getUser(this.id).subscribe((res) => {
      this.user = res.user;
      this.edit_age = this.user.age;
      this.edit_country = this.user.country;
      this.edit_gender = this.user.gender;
      this.edit_name = this.user.name;
      this.edit_image = this.user.image;
      this.spinner.hide().then();
    });
  }

  onEditProfile(): void {
    this.editStatus = !this.editStatus;
  }

  onSubmit(event: any): void {
    event.preventDefault();

    if (
      this.edit_age ||
      this.edit_country ||
      this.edit_gender ||
      this.edit_name ||
      this.edit_image
    ) {
      const data = {
        age: this.edit_age || this.user.age,
        country: this.edit_country || this.user.country,
        name: this.edit_name || this.user.name,
        gender: this.edit_gender || this.user.gender,
        image: this.edit_image || this.user.image,
      };

      this.userService.updateUser(data, this.id).subscribe(
        (res: any) => {
          this.toast.success('Cập nhật profile thành công');
          this.user = res.user;
					this.editStatus = !this.editStatus;
          this.spinner.hide();

        },
        (error) => {
          this.toast.error(`${'Có lỗi xảy ra'}`);
					this.editStatus = !this.editStatus;
          this.spinner.hide();
        }
      );
    }
  }

  onCancel(): void {
    this.editStatus = !this.editStatus;
  }
}

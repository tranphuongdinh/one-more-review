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
  constructor(private spinner: NgxSpinnerService,   private formBuilder: FormBuilder,  private toast: ToastrService,
    private userService: UserService)
  { }
  editStatus: boolean = false;
  user!: any;
  id!: any;
  edit_age!: string;
  edit_country!: string;
  edit_gender!: boolean;
  edit_name!: string;
  
  ngOnInit(): void {
    this.id = localStorage.getItem('USER_ID');
    this.userService.getUser(this.id).subscribe((res) => {
      this.user = res.user;
			this.spinner.hide().then();
    });
  }

  onEditProfile(): void{
    this.editStatus = !this.editStatus;
  }

  onSubmit(event:any): void {
    event.preventDefault();

    this.user.age = parseInt(this.edit_age) || this.user.age;
    this.user.country = this.edit_country || this.user.country;
    this.user.name = this.edit_name || this.user.name;
    this.user.gender = this.edit_gender || this.user.gender;
    console.log(this.user);
    
    this.spinner.show();
    this.userService.updateUser(this.user, this.id).subscribe(
      (res : any) => {
      this.toast.success('Cập nhật profile thành công');
			this.user = res.user;
      this.spinner.hide();
    },
    (error) => {
      this.toast.error(`${'Cập nhật profile thất bại:'} ${error.message}`);
    });
    this.editStatus = !this.editStatus;
    this.spinner.hide();

}
}

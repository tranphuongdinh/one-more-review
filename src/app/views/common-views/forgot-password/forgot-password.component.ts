import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from './../../../services/api.service';
import { Router } from '@angular/router';
import Validation from '../../../utils/validation';

import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  confirmEmailForm!: FormGroup;

  confirmEmailSubmitted = false;
  confirmEmailNotification: String = '';

  resetPasswordSubmitted = false;
  resetPasswordNotification: String = '';

  check!: any;

  constructor(
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.spinner.hide().then();

    this.check = localStorage.getItem('ACCESS_TOKEN');
    if (this.check) {
      this.router.navigateByUrl('');
    }
	else {
		//this.router.navigateByUrl('/authenticate');
	}

    // xac thuc digit code cac kieu :v
    this.confirmEmailForm = this.formBuilder.group({
      digitCode: ['', [Validators.required, Validators.maxLength(4),  Validators.minLength(4)]],
    });

    this.resetPasswordForm = this.formBuilder.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: [Validation.match('password', 'confirmPassword')] }
    );
  }

  //   fc là form confirm email, fr là form reset password
  get fc(): { [key: string]: AbstractControl } {
    return this.confirmEmailForm.controls;
  }

  get fr(): { [key: string]: AbstractControl } {
    return this.resetPasswordForm.controls;
  }

  onResetPasswordSubmit(): void {
    this.resetPasswordNotification = '';
    this.resetPasswordSubmitted = true;

    if (this.resetPasswordForm.invalid) {
      return;
    }
    const getValue = this.resetPasswordForm.getRawValue();
    const data = { password: getValue.password, confirmPassword: getValue.confirmPassword };
  }

  onConfirmEmailSubmit(): void {
    this.confirmEmailNotification = '';
    this.confirmEmailSubmitted = true;
    if (this.confirmEmailForm.invalid) {
      return;
    }
    const getValue = this.confirmEmailForm.getRawValue();
    const data = { digitCode: getValue.digitCode };
  }

  togglePoster(): void {
    if (!this.fc.digitCode.errors)
      $('.poster').toggleClass('left');
    else
      return;
  }
}

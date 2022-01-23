import { AfterViewInit, Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from './services/auth.service';
import { ProfileService } from './services/profile.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  title = 'omr-one-more-review';

  constructor(
    private spinner: NgxSpinnerService,
    private auth: AuthService,
    private profile: ProfileService
  ) {
    this.spinner.show().then();
  }

  ngAfterViewInit(): void {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    this.auth.isReady.subscribe((r) => {
      if (r) {
				const id = this.profile.getId();
        this.profile.getProfile(id);
      }
    });

    // Whenever the user explicitly chooses light mode
    //     localStorage.theme = 'light'

    // Whenever the user explicitly chooses dark mode
    //     localStorage.theme = 'dark'

    // Whenever the user explicitly chooses to respect the OS preference
    //     localStorage.removeItem('theme')
  }
}

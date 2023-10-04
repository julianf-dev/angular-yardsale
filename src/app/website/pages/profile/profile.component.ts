import { Component, inject } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  user: User | null = null
  authService = inject(AuthService)

  ngOnInit() {
    this.authService.getUser()
      .subscribe(data => {
        this.user = data
      })
  }
}

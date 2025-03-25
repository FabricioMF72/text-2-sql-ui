import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent{
  private authService: AuthService = inject(AuthService);
  public user = this.authService.user
  public isMenuOpen = false;

  printUser() {
    console.log(this.user())
  }

  closeMenu(){
    this.isMenuOpen = false;
  }

  public logOut() {
    this.authService.logout()
  }
}

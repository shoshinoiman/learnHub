import { Component  } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterOutlet, RouterLinkActive, RouterLink,MatToolbarModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  // token!: any
  // userName: string = '';
  constructor(private userService: UserService) { }
  ngOnInit() {
    // this.token = this.userService.getToken();
    //  this.userName = this.userService.getUserName().toUpperCase();

  }
  getFromSessionStorage(key: string): string | null {
    return sessionStorage.getItem(key);
  }
}


import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { RegisterComponent } from "../component/register/register.component";
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { UserService } from '../services/user/user.service';
import { HomeComponent } from "../component/home/home.component";
import { MenuComponent } from "../component/menu/menu.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  token!:any
  constructor(private userService:UserService){}
  ngOnInit(){
   this.token= this.userService.getToken();}
  title = 'myProject';
}

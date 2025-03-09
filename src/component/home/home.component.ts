import { Component } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Course } from '../../models/course';
import { CourseService } from '../../services/course/course.service';
import { UserService } from '../../services/user/user.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatToolbarModule, 
     
    MatDialogModule,  
    MatButtonModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  // courses: Course[] = [];
  // constructor(private coursesService: CourseService,private userService:UserService) { }
  // ngOnInit() {
  //   this.coursesService.getCourses().subscribe({
  //     next: (response) => {
  //       this.courses =response.courses; ;
  //     },
  //     error: (err) => {
  //      alert('❌ ERROR: ' + (err.error.message || 'Home משהו השתבש'))
  //     }
  //   });
  // } 
}

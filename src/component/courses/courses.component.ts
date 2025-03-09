import { Component } from '@angular/core';
import { CourseService } from '../../services/course/course.service';
import { Course } from '../../models/course';
import { UserService } from '../../services/user/user.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { response } from 'express';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [RouterLink, RouterOutlet,MatListModule,CommonModule,MatCardModule,MatButtonModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  courses: Course[] = [];

  constructor(private coursesService: CourseService, private userService: UserService) { }

  ngOnInit() {
    this.show()
  } 

  show(){
    this.coursesService.getCourses().subscribe({
      next: (response) => {
        this.courses = response;
        console.log(response);
      },
      error: (err) => {
        alert('❌ ERROR: ' + (err.error.message || 'משהו השתבש'))
      }
    });
  }

  addStudentToCourse(course:Course){
    this.coursesService.addStudentToCourse(course.id).subscribe({
      next:(response)=>{
        alert('✅'+response.message)
        course.isEnrolled=true;
      },
      error:(e)=>{alert('❌'+e.error.messeege)}
    })

  }
deleteStudentToCourse(course:Course){
  this.coursesService.deleteStudentFromCourse(course.id).subscribe({
    next:(response)=>{
      alert('✅'+response.message)
      course.isEnrolled=false;
    },
    error:(e)=>{alert('❌'+e.error.messeege)}
  })
}

}

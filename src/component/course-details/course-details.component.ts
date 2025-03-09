import { Component, Input, input, OnInit } from '@angular/core';
import { Course } from '../../models/course';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services/course/course.service';
import { Lesson } from '../../models/lesson';
import { LessonService } from '../../services/lesson/lesson.service';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [MatCardModule, MatDividerModule, MatListModule,],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent implements OnInit {
  isShow = false;
  coursId!: number;
  course: Course | undefined;
  lessons: Lesson[] = [];
  constructor(private route: ActivatedRoute, private courseService: CourseService, private lessonService: LessonService) { }

  ngOnInit(): void {
    this.coursId = +this.route.snapshot.paramMap.get('id')!;
    this.courseService.getCourseById(this.coursId).subscribe({
      next: (response) => { this.course = response },
      error: (e) => { }
    })
    
    this.lessonService.getAllLessonsByCourseId(this.coursId).subscribe({
      next: (response) => {
        this.lessons = response
        console.log(response);

      },
      error: (e) => { }
    })

  }
  showLessons() { this.isShow = !this.isShow }
}


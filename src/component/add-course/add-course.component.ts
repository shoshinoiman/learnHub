import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { CourseService } from '../../services/course/course.service';
import { Course } from '../../models/course';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [FormsModule, MatCardModule, MatButtonModule, MatIconModule, MatIconModule, MatDialogModule, CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css'
})

export class AddCourseComponent {

  newCourse: Course = {
    id: 0, title: '', description: '',
    teacherId: 0,
    showLessons: false,
    isEnrolled: false
  }

  @Output() close = new EventEmitter<void>();
  @Output() courseAdded = new EventEmitter<Course>();

  constructor(private courseService: CourseService) { }

  addCourse() {
    
    if (!this.newCourse.title.trim() || !this.newCourse.description.trim()) {
      alert("❌ יש למלא את כל השדות!");
      return;
    }

    this.courseService.add(this.newCourse).subscribe({
      next: (response) => {
        this.courseAdded.emit(this.newCourse)
        this.close.emit()
      },
      error: (e) => { alert("❌ ERROR: " + e.error.message); }
    });
  }
}

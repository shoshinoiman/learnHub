
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../models/course';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../services/course/course.service';
import { EditLessonComponent } from '../edit-lesson/edit-lesson.component';

@Component({
  selector: 'app-edit-course',
  standalone: true,
  imports: [ FormsModule,],
  templateUrl: './edit-course.component.html',
  styleUrl: './edit-course.component.css'
})

export class EditCourseComponent {
  @Input() course!: Course; 
  @Output() close = new EventEmitter<void>(); 
  @Output() save = new EventEmitter<Course>(); 
constructor(private courseService:CourseService) { }
  @Component({
    selector: 'app-edit-course',
    templateUrl: './edit-course.component.html',
    styleUrls: ['./edit-course.component.css']
  })
  saveChanges() {
this.courseService.update(this.course.id, this.course).subscribe({
  next: (response) => {alert("✅ " + this.course.title + " עודכן בהצלחה!");
    this.save.emit(this.course);
  },
  error: (e) => { alert("❌ ERROR edit " + e.error.messeege) }
})
    this.close.emit(); 
  }
}


import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../models/course';
import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
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
  @Input() course!: Course; // מקבל את הקורס לעריכה
  @Output() close = new EventEmitter<void>(); // סוגר את המודל
  @Output() save = new EventEmitter<Course>(); // שולח עדכון לקומפוננטת האב
constructor(private courseService:CourseService) { }
  @Component({
    selector: 'app-edit-course',
    templateUrl: './edit-course.component.html',
    styleUrls: ['./edit-course.component.css']
  })
  saveChanges() {
this.courseService.update(this.course.id, this.course).subscribe({
  next: (response) => {alert("✅ " + this.course.title + " עודכן בהצלחה!");
    this.save.emit(this.course); // שולח את העדכון
  },
  error: (e) => { alert("❌ ERROR edit " + e.error.messeege) }
})
    this.close.emit(); // סוגר את המודל
  }
}

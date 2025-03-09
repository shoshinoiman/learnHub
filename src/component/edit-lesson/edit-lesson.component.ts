import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../models/course';
import { Lesson } from '../../models/lesson';
import { CourseService } from '../../services/course/course.service';
import { LessonService } from '../../services/lesson/lesson.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-lesson',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-lesson.component.html',
  styleUrl: './edit-lesson.component.css'
})
export class EditLessonComponent {
@Input() lesson!: Lesson; // מקבל את הקורס לעריכה
  @Output() close = new EventEmitter<void>(); // סוגר את המודל
  @Output() save = new EventEmitter<Lesson>(); // שולח עדכון לקומפוננטת האב
constructor(private lessonService:LessonService) { }
  @Component({
    selector: 'app-edit-course',
    templateUrl: './edit-course.component.html',
    styleUrls: ['./edit-course.component.css']
  })
  saveChanges() {
this.lessonService.addLesson(this.lesson, this.lesson.courseId).subscribe({
  next: (response) => {alert("✅ " + this.lesson.title + " עודכן בהצלחה!");
    this.save.emit(this.lesson); // שולח את העדכון
  },
  error: (e) => { alert("❌ ERROR edit " + e.error.messeege) }
})
    this.close.emit(); // סוגר את המודל
  }
}

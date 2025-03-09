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
@Input() lesson!: Lesson; 
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Lesson>(); 
constructor(private lessonService:LessonService) { }
  @Component({
    selector: 'app-edit-course',
    templateUrl: './edit-course.component.html',
    styleUrls: ['./edit-course.component.css']
  })
  saveChanges() {
this.lessonService.addLesson(this.lesson, this.lesson.courseId).subscribe({
  next: (response) => {alert("✅ " + this.lesson.title + " עודכן בהצלחה!");
    this.save.emit(this.lesson);
  },
  error: (e) => { alert("❌ ERROR edit " + e.error.messeege) }
})
    this.close.emit(); 
  }
}

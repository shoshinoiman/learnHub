import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { LessonService } from '../../services/lesson/lesson.service';
import { Course } from '../../models/course';
import { Lesson } from '../../models/lesson';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-add-lesson',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-lesson.component.html',
  styleUrl: './add-lesson.component.css'
})
export class AddLessonComponent {
  newLesson: Lesson = {
    id: 0, title: '', content: '', courseId: 0,
  };
  @Output() close = new EventEmitter<void>();
  @Output() lessonAdded = new EventEmitter<Lesson>();
  @Input() course!: Course;
  constructor(private lessonService: LessonService) { }

  addLesson() {
    if (!this.newLesson.title.trim() || !this.newLesson.content.trim()) {
      alert("❌ יש למלא את כל השדות!");
      return;
    }

    this.lessonService.addLesson(this.newLesson, this.course.id).subscribe({
      next: () => {
        this.lessonAdded.emit(this.newLesson); 
        this.close.emit(); 
      },
      error: (e) => { alert("❌ ERROR: " + e.error.messege);
        console.log(this.course);
        console.log(this.newLesson);
       }
    });
  }
}

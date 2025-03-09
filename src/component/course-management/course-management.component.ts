import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course/course.service';
import { Course } from '../../models/course';
import { EditCourseComponent } from "../edit-course/edit-course.component";
import { Lesson } from '../../models/lesson';
import { LessonService } from '../../services/lesson/lesson.service';
// import { get } from 'http';
import { AddCourseComponent } from '../add-course/add-course.component';
import { AddLessonComponent } from '../add-lesson/add-lesson.component';
// import { EditLessonComponent } from '../edit-lesson/edit-lesson.component';
import { error } from 'console';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-course-management',
  standalone: true,
  imports: [EditCourseComponent, AddCourseComponent, AddLessonComponent, CommonModule, MatDividerModule, MatCardModule,MatListModule, MatIconModule,MatButtonModule],
  templateUrl: './course-management.component.html',
  styleUrl: './course-management.component.css'
})
export class CourseManagementComponent implements OnInit {
  courseList: Course[] = [];
  selectedCourse: Course | null = null;
  lessonsList: Lesson[] = [];
  showAddCourse: boolean = false;
  showAddLesson: boolean = false;
  selectedLesson: Lesson | null = null;
  isEnrolled:boolean=false;
  // isShowLessons = false;
  constructor(private courseService: CourseService, private lessonService: LessonService) { }

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses() {
    this.courseService.getCourses().subscribe({
      next: (response) => { this.courseList = response },
      error: () => { alert("❌ טעינת הקורסים נכשלה!") }
    });
  }

  onClickAddCourse() {
    this.showAddCourse = true;
  }


  addCourse(course: Course) {
    this.courseList.push(course);

  }

  closeAddModel() {
    this.showAddCourse = false;
  }

  deleteCourse(courseId: number) {
    this.courseService.delete(courseId).subscribe({
      next: (response) => { alert("✅ " + response.messege) },
      error: (e) => { alert("❌ ERROR manager" + e.error.messeege) }
    })
    this.courseList = this.courseList.filter(c => c.id !== courseId);
  }

  updateCorse(course: Course) {
    this.selectedCourse = { ...course }
  }
  

  saveUpdatedCourse(updatedCourse: Course) {
    const index = this.courseList.findIndex(c => c.id === updatedCourse.id);
    if (index !== -1) {
      this.courseList[index] = updatedCourse;  // עדכון הקורס ברשימה
      // alert("✅ הקורס עודכן בהצלחה!");
    }
    this.selectedCourse = null; // סוגר את המודל
  }

  closeEditModel() {
    this.selectedCourse = null
  }

  getLessons(courseId: number) {
    this.lessonService.getAllLessonsByCourseId(courseId).subscribe({
      next: (response) => { this.lessonsList = response },
      error: (e) => { alert("❌ ERROR " + e.error.messeege) }
    })
  }

  showLessons(course: Course) {
    this.getLessons(course.id);
    course.showLessons = !course.showLessons;
  }

  onClickAddLesson() {
    this.showAddLesson = true;
  }

  addLesson(lesson: Lesson) {
    this.lessonsList.push(lesson);
  }

  closeAddModelLesson() {
    this.showAddLesson = false;
  }

  deleteLesson(lessonId: number, courseId: number) {
    this.lessonService.deleteLesson(lessonId, courseId).subscribe({
      error: (e) => { alert("❌ ERROR manager" + e.error.messeege) }

    })
    this.lessonsList = this.lessonsList.filter(l => l.id !== lessonId);
  }

  updateLesson(lesson: Lesson) {
    this.selectedLesson = { ...lesson }
  }

  saveUpdatedLesson(updatedLesson: Lesson) {
    const index = this.lessonsList.findIndex(c => c.id === updatedLesson.id);
    if (index !== -1) {
      this.lessonsList[index] = updatedLesson;  // עדכון הקורס ברשימה
    }
    this.selectedLesson = null; // סוגר את המודל
  }

  addStudentToCourse(course:Course){
    this.courseService.addStudentToCourse(course.id).subscribe({
      next:(response)=>{
        alert('✅'+response.message)
        course.isEnrolled=true;
      },
      error:(e)=>{alert(e.error.messeege)}
    })

  }
deleteStudentToCourse(course:Course){
  this.courseService.deleteStudentFromCourse(course.id).subscribe({
    next:(response)=>{
      alert('✅'+response.message)
      course.isEnrolled=false;
    },
    error:(e)=>{alert(e.error.messeege)}
  })
}
}

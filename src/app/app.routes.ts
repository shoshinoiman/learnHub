import { Routes } from '@angular/router';
import { RegisterComponent } from '../component/register/register.component';
import { LoginComponent } from '../component/login/login.component';
import { HomeComponent } from '../component/home/home.component';
import { CoursesComponent } from '../component/courses/courses.component';
import { CourseDetailsComponent } from '../component/course-details/course-details.component';
import { CourseManagementComponent } from '../component/course-management/course-management.component';

export const routes: Routes = [
    {path:'',component: HomeComponent},
    {path:'register',component: RegisterComponent},
    {path:'login',component: LoginComponent},
    {path:'courses',component:CoursesComponent},
    {path:'course-details/:id',component:CourseDetailsComponent},
    {path:'courseManagement',component:CourseManagementComponent },
];

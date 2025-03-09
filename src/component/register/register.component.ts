import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Subscriber } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Role } from '../../models/role';
import { User } from '../../models/user';
import { response } from 'express';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,MatCardModule,MatFormFieldModule,MatInputModule,MatButtonModule,MatSelectModule,MatIconModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  constructor(private userService: UserService, private fb: FormBuilder) { }
  registerForm!: FormGroup;
  roles = Object.values(Role);
  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      role: ['', Validators.required]
    });
  }

  get form() {
    return this.registerForm.controls;
  }
  register() {
    const newUser: User = this.registerForm.value;
    this.userService.AddUser(newUser).subscribe({
      next: (response) => {
        alert('✅' + response.message)
      },
      error: (err) => { alert('❌ ERROR: ' + (err.error.message || 'משהו השתבש')) }
    });
    this.userService.login(this.registerForm.value).subscribe({
      next: (response) => {
        this.userService.saveToken(response.token);
      },
      error: (err) => { }
    })
  }
}


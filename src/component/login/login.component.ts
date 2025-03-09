import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MatError } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule,  CommonModule,MatCardModule,MatFormFieldModule,MatInputModule,MatButtonModule,MatIconModule,MatError],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get form() {
    return this.loginForm.controls;
  }

  constructor(private fb: FormBuilder, private userServise: UserService) { }
  login() {
    this.userServise.login(this.loginForm.value).subscribe({
      next: (response) => {
        this.userServise.saveToken(response.token);
        alert('✅' + response.message)
      },
      error: (err) => { alert('❌ ERROR: ' + (err.error.message || 'משהו השתבש')) }
    })
  }

}

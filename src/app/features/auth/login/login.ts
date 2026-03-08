import { Component ,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule , FormBuilder ,FormGroup ,Validators} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth';


@Component({
  selector: 'app-login',
  imports: [CommonModule , ReactiveFormsModule , RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Giriş bilgileri:', this.loginForm.value);

      // Test kullanıcı oluştur ve login yap
      const testUser = {
        id: 1,
        email: this.loginForm.value.email,
        password_hash: this.loginForm.value.password,
        role_type: 'INDIVIDUAL' as const
      };

      this.authService.login(testUser);
      this.router.navigate(['/shop']);
    }
  }

}

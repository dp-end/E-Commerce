import { CommonModule } from '@angular/common';
import { Component , inject} from '@angular/core';
import { ReactiveFormsModule , FormBuilder, Validators} from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [CommonModule ,ReactiveFormsModule,RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  registerForm: FormGroup = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]
  }, {
    // Şifrelerin eşleşip eşleşmediğini kontrol eden özel validator
    validators: this.passwordMatchValidator
  });

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Kayıt bilgileri:', this.registerForm.value);
      // Başarılı kayıt sonrası Login'e yönlendir
      this.router.navigate(['/login']);
    }
  }
}

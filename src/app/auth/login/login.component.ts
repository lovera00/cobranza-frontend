import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginFormInterface, LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public formSubmited = false;
  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)]],
    remember: [localStorage.getItem('remember') || false]
  });

  constructor(private router: Router, private fb: FormBuilder, private loginServices: LoginService) { }
  login() {
    this.formSubmited = true;
    if (this.loginForm.invalid) {
      return;
    }
    const loginData: LoginFormInterface = {
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!
    };
    this.loginServices.login(loginData).subscribe((res) => {

      //verificar si remember es true y guardar el email en el localStorage y tambien el remember
      if (this.loginForm.value.remember) {
        localStorage.setItem('email', loginData.email!);
        localStorage.setItem('remember', 'true');
      } else {
        localStorage.removeItem('email');
        localStorage.removeItem('remember');
      }      
      this.router.navigateByUrl('/dashboard');
    });
  }
}

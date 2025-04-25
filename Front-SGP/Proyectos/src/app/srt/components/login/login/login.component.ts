import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { loginRequest } from '../../store/login/login.actions';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,   private router: Router, ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.store.dispatch(loginRequest({ username, password }));
    } else {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Por favor ingrese todos los campos.'});
    }
  }

   // Este método sería parte de un efecto que escucha la respuesta del loginRequest
   redirectToDashboard() {
    this.router.navigate(['/dashboard']); // Redirige al Dashboard
  }
}

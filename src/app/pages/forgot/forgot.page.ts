import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch } from 'src/app/helpers/must-match.validator';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {

  forgotForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
    this.forgotForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]),
      password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(13)]),
      confirmPassword: new FormControl('', Validators.required)
    },{
      validator: MustMatch('password', 'confirmPassword')
    })
  }

  newPass() {
    let body = this.forgotForm.value;
    let newPassword = {
      password: body.password
    }
    this.authService.update(body.email, newPassword).subscribe((res) => {
      this.router.navigate(['login']);
    }, (err) => {
      console.log("error", err);
    })
  }

}

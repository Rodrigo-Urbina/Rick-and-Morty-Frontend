import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MustMatch } from '../../helpers/must-match.validator'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router, 
              private authService: AuthService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]),
      password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(13)]),
      confirmPassword: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      cellphone: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(13)])
    }, {
      validator: MustMatch('password', 'confirmPassword')
    })
  }

  register() {
    let body = this.registerForm.value;
    let newBody = {
      email: body.email,
      password: body.password,
      firstName: body.firstName,
      lastName: body.lastName,
      cellphone: body.cellphone
    }
    this.authService.register(newBody).subscribe((res) => {
      if(res.status){
        return console.log(res);
      }
      this.router.navigate(['login']);
    }, (err) => {
      console.log("error", err);
    })
  }

}

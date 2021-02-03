import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  loading = false;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              public alertController: AlertController) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]),
      password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(13)])
    })
  }

  login() {
    let body = this.loginForm.value;
    this.authService.login(body.email, body.password)
      .subscribe((res) => {
        console.log("No hubo error");
        if(res.error){
          console.log(res.error);
          this.alert();
        } else {
          this.router.navigate(['characters']);
        }
      }, (err) => {
        console.log("Hubo un error", err);
      });
  }

  async alert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Invalid credentials',
      message: 'Please verify your data and try again',
      buttons: ['OK']
    });

    await alert.present();
  }

}

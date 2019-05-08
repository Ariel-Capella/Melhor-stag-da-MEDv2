import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService, } from '../_services/user.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  validation = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
        
  ) { }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });

  }

  onClick(){
    
    if (this.loginForm.invalid) {
      this.validation = false;
  }else{
    this.validation = true;
  }

    const userName = this.loginForm.controls['username'].value;
    const userPassword = this.loginForm.controls['password'].value;
    this.userService.login(userName, userPassword)
      .subscribe(
        data => {
          this.router.navigate(['/logged']);
        },
        error => {
          window.alert('nope')
        });
    
  }


}

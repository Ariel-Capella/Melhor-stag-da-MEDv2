import { Component, OnInit } from '@angular/core';
import { UserService, } from '../_services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {User} from '../_models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  validation = true;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,

  ) {

  }


  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });

    
  }
  
  onClick(){
    if (this.registerForm.invalid) {
      this.validation = false;
  }else{
    this.validation = true;
  }
    
  
    const user = new User();
    user.name = this.registerForm.controls['username'].value;
    user.senha = this.registerForm.controls['password'].value;
    this.userService.register(user)
      .subscribe(
        data => {
          this.router.navigate(['/login']);
        },
        error => {
          window.alert('nope')
        });
    
  }




}








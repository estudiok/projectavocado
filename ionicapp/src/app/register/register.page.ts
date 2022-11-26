import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  
  formRegister: FormGroup;
  
  constructor(public formBuilder: FormBuilder) { 
    
    this.formRegister = this.formBuilder.group({
      'firstName': new FormControl("", Validators.required),
      'secondName': new FormControl("", Validators.required),
      'fatherLastName': new FormControl("", Validators.required),
      'motherLastName': new FormControl("", Validators.required),
      'email': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required),
      'repeatPassword': new FormControl("", Validators.required)
    })

  }
  
  ngOnInit() {
    console.log("register")
  }

}

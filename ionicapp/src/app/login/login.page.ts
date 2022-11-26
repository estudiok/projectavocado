import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formLogin: FormGroup;



  constructor(
    public formBuilder: FormBuilder,
    private user_service: UserService,
    ) { 
    this.formLogin = this.formBuilder.group({
      'email': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required)
    })
  }

  ngOnInit() {
    console.log("entrastaa LOGIN");
  }

  ionViewWillEnter() {
    console.log("entro de nuevo will enter page 1");

    this.user_service.getUsers().subscribe(
      (user: User[]) => {
        console.log(user);
      }
    );
    
  }

  getInto() {
    console.log("hola ");
  }


}

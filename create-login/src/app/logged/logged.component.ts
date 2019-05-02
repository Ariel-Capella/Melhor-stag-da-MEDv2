import { Component, OnInit } from '@angular/core';
import {User} from '../_models/user';
import { UserService, } from '../_services/user.service';
import { UserFriends } from '../_models/UsuarioFriends';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logged',
  templateUrl: './logged.component.html',
  styleUrls: ['./logged.component.css']
})
export class LoggedComponent implements OnInit {
  users: User[];
  friends:  UserFriends[];
  
  constructor(
    private userService: UserService,
    private router: Router


  ) {

  }

  ngOnInit() {
    if(this.userService.isLogged()){

    
    
      
    
    this.userService.userList()
      .subscribe(
        data => {
          this.users = data;
        });

  }else{
    this.router.navigate(['/login']);
  }
}

  
  onClick(IdFriends: number){

    this.userService.addFriend(IdFriends)
    .subscribe(
      data => {
        
      });

  }

  reload(){
    this.userService.userFriendList()
      .subscribe(
        data => {
          this.friends = data;
        });
  }

}

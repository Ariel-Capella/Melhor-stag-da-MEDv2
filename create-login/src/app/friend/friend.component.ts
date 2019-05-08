import { Component, OnInit, Input } from '@angular/core';
import { UserService, } from '../_services/user.service';
import { UserFriends } from '../_models/UsuarioFriends';

@Component({
  selector: 'friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {
  
  
  @Input()
  public user: UserFriends
  public isVisible = true
  constructor(

    private userService: UserService
  ) 
  {} 

   

  ngOnInit() {
  }

  onClick(){
    this.isVisible = false;
    this.userService.addFriend(this.user.idUser)
    .subscribe(
      data => {
        
      });

 }
}

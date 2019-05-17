import { Component, OnInit, Input } from '@angular/core';
import { UserService, } from '../_services/user.service';
import { UserFriends } from '../_models/UsuarioFriends';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { User } from '../_models/user';

@Component({
  selector: 'friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {
  
  public Image_63_string: any;

  Image_64_string: any;
  
  @Input()
  public user: User
  //public uuser: User
  public isVisible = true
  constructor(

    private userService: UserService,
    private _sanitizer: DomSanitizer
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
onwatever(){


      this.userService.getImage2(this.user.Id_Photo)
      .subscribe(

        data => {
          this.Image_63_string = data;

        }
      )
      }
 

 convertImage1(): SafeUrl {

  return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + this.Image_63_string);

}
}

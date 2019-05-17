import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { UserService, } from '../_services/user.service';
import { UserFriends } from '../_models/UsuarioFriends';
import { Router } from '@angular/router';
import { PhotoItem } from '../_models/PhotoItem';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-logged',
  templateUrl: './logged.component.html',
  styleUrls: ['./logged.component.css']

})
export class LoggedComponent implements OnInit {
  users: User[];
  friends: UserFriends[];
  Image_64_string: any;
  Image: PhotoItem;

  constructor(

    private router: Router,
    private userService: UserService,
    private _sanitizer: DomSanitizer,



  ) {

  }

  ngOnInit() {
    if (this.userService.isLogged()) {
      this.userService.userList()
        .subscribe(
          data => {
            this.users = data;
          });

    } else {
      this.router.navigate(['/login']);
    }
}
  reload() {
    this.userService.userFriendList()
      .subscribe(
        data => {
          this.friends = data;
        });
  }

  get_imagem(){
    this.userService.get_image();
  }

  convertImage(): SafeUrl {

    return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + this.userService.Image_64_string);

  }

  
}



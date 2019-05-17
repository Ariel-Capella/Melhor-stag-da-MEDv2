import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { User } from '../_models/user';
import { UserFriends } from '../_models/UsuarioFriends';
import { PhotoItem } from '../_models/PhotoItem';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { LoggedComponent } from '../logged/logged.component';



@Injectable()
export class UserService {

    public idUser: number;
    public check_Current_Id: number;
    public Image_64_string: any;
    public Image_63_string: any;

    constructor(
        private http: HttpClient,
        private _sanitizer: DomSanitizer,


    ) { }
    
    
    public get_image() {

        var id = this.idUser
        this.getImage(id)
          .subscribe(
    
            data => {
              this.Image_64_string = data;
    
            }
          )
      }


    register(user: User) {
        const hheader = new HttpHeaders().set('Content-Type', 'application/json');

        const optionsObject = {
            headers: hheader
        };

        return this.http.post('http://localhost:44346/api/Api/post', user, optionsObject);


    }

    login(username: string, password: string, ) {
        var user = new User();
        user.name = username;
        user.senha = password;

        const hheader = new HttpHeaders().set('Content-Type', 'application/json');

        const optionsObject = {
            headers: hheader
        };

        return this.http.post<number>('http://localhost:44346/api/Api/login', user, optionsObject)
            .pipe(
                tap((valueQueVeioDoServer) => {
                    this.idUser = valueQueVeioDoServer;                   
                })
            );


    }

    isLogged(): boolean {
        if (this.idUser == undefined || this.idUser == null) {
            return false;
        } else {
            return true;
        }
    }

    userList() {
        return this.http.get<User[]>('http://localhost:44346/api/Api/userList/' + this.idUser);
    }

    userFriendList() {

        return this.http.get<UserFriends[]>('http://localhost:44346/api/Api/userFriendList/' + this.idUser);
    }





    addFriend(idFriends: number) {

        var boddy = new UserFriends();
        boddy.idFriends = idFriends;
        boddy.idUser = this.idUser;


        return this.http.post('http://localhost:44346/api/Api/addFriend', boddy);

    }


    getImage(IdUser: number) {

        var Photo = new User();
        Photo.idUser = IdUser;
        

        return this.http.post('http://localhost:44346/api/Api/Get_Photo', Photo, { observe: 'body', responseType: 'text' });
    }

    getImage2(Id_Photo: number) {

        var Photo = new User();
        Photo.Id_Photo = Id_Photo;
        

        return this.http.post('http://localhost:44346/api/Api/Get_Photo2', Photo, { observe: 'body', responseType: 'text' });
    }

}
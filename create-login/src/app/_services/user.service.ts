import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import {User} from '../_models/user';
import { UserFriends } from '../_models/UsuarioFriends';


@Injectable()
export class UserService {

    public idUser: number;
    
    constructor(
        private http: HttpClient
        
        ){}



register(user: User){
    const hheader = new HttpHeaders ().set('Content-Type', 'application/json');

    const optionsObject = {
        headers: hheader
    };

    return this.http.post('http://localhost:49915/api/Api/post',  user, optionsObject );


}

login(username: string, password: string,){
    var user = new User();
    user.name = username;
    user.senha = password;
 
    const hheader = new HttpHeaders ().set('Content-Type', 'application/json');

    const optionsObject = {
        headers: hheader
    };

    return this.http.post<number>('http://localhost:49915/api/Api/login',  user, optionsObject )
    .pipe(
        tap((valueQueVeioDoServer) => {
            this.idUser = valueQueVeioDoServer;
        })
    );


}

isLogged(): boolean {
    if (this.idUser == undefined || this.idUser == null){
        return  false;
    }else{
        return true;
    }
}

userList(){
 return this.http.get<User[]>('http://localhost:49915/api/Api/userList/' + this.idUser);
}

userFriendList(){

    return this.http.get<UserFriends[]>('http://localhost:49915/api/Api/userFriendList/' + this.idUser,);
   }



   

   addFriend(idFriends: number){
    
    var boddy = new UserFriends();
    boddy.idFriends = idFriends;
    boddy.idUser = this.idUser;
    

    return this.http.post('http://localhost:49915/api/Api/addFriend', boddy );

   }

   saveImage(formulario : FormData){
    return this.http.post('http://localhost:56008/saveImage', formulario)
}


}
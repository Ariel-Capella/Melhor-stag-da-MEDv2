import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { detachProjectedView } from '@angular/core/src/view/view_attach';
import { UserService, } from '../_services/user.service';

@Component({
  selector: 'file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent implements OnInit {

  private http : HttpClient;
  private files : FileList;
  public selectedFile : File;
  public imagePath: any;
  public imgURL : any;
  public check_Current_Id = this.userService.check_Current_Id;
  
  constructor(

    private userService : UserService,
    http : HttpClient,
    
    
    
    ) { 
      this.http = http;
      this.selectedFile = null;
      
    }

  ngOnInit() {
  }

  onFileSelected(event){
    
    this.files = event.target.files
    this.selectedFile = event.target.files[0];
    this.preview();

  }
  

  onUpload(){

    const formulario = new FormData();
    formulario.append('image', this.selectedFile, this.selectedFile.name)
    formulario.append('currentLoged', this.check_Current_Id.toString() )
    this.http.post('http://localhost:49915/api/Api/save/', formulario)
    .subscribe(
      data => {

        console.log(data);
      }
      );

    
  }

   preview(){
      if(this.files.length == 0)
     {
        return;
     }
     var reader = new FileReader();
      this.imagePath = this.files;
     reader.readAsDataURL(this.files[0]);
    reader.onload = (_event) =>
     {
       this.imgURL = reader.result;
      }
}
 
}

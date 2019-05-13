import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';


@Component({
  selector: 'file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent implements OnInit {

  selectedFile : File = null;
  
  constructor(
    private http : HttpClient,
  
    ) { }

  ngOnInit() {
  }

  onFileSelected(event){
    //console.log(event)
    let files : FileList = event.target.files
    this.selectedFile = event.target.files[0];
  }

  onUpload(){

    const formulario = new FormData();
    formulario.append('image', this.selectedFile, this.selectedFile.name)
    this.http.post('http://localhost:49915/api/Api/save/', formulario)
    .subscribe(
      data => {

        console.log(data);
      }
      );

  }

}

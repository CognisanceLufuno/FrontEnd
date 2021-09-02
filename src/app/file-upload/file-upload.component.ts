import { AppComponent } from './../app.component';
import { Component, OnInit } from '@angular/core';
import { FileToUpload } from './file-to-upload';
import { ViewComponent } from '../view-uploads/view/view.component';
import { FileUploadService } from '../services/file-upload.service';

// Maximum file size allowed to be uploaded = 1MB
const MAX_SIZE: number = 1048576;

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.sass']
})
export class FileUploadComponent implements OnInit {

  constructor(private uploadService: FileUploadService, 
    public viewComponent: ViewComponent) { }

  theFile: File = new File([], '');
  messages: string[] = []; 
  apiText: any = null;

  ngOnInit(): void {
  }

  onFileChange(event) {
    //this.theFile = null;
    let fileList = (<HTMLInputElement>event.target).files;
    if (event.target.files && event.target.files.length > 0) {
        // Don't allow file sizes over 1MB
        if (event.target.files[0].size < MAX_SIZE) {
            // Set theFile property
            
            //this.theFile = event.target.files[0];
            if(fileList != null){
              this.theFile = fileList[0];
            }
        }
        else {
            // Display error message
            this.messages.push("File: " + event.target.files[0].name + " is too large to upload.");
        }
    }
}

private readAndUploadFile(theFile: any) {
  let file = new FileToUpload();
  
  // Set File Information
  file.FileName = theFile.name;
  //file.FileSize = theFile.size;
  //file.FileType = theFile.type;
  //file.LastModifiedTime = theFile.lastModified;
  //file.LastModifiedDate = theFile.lastModifiedDate;
  
  // Use FileReader() object to get file to upload
  let reader = new FileReader();
  
  // Setup onload event for reader
  reader.onload = () => {
    
    if(reader.result != null){
      // Store base64 encoded representation of file
      file.FileAsBase64 = reader.result.toString();
            
      // POST to server
      this.uploadService.uploadFile(file).subscribe(resp => { 
          this.messages.push("Upload complete"); });
    }
    else{
      this.messages.push("There was an issue trying upload please try again.");
    }
      
  }
  
  // Read the file
  reader.readAsDataURL(theFile);
}

uploadFile(): void {
  this.readAndUploadFile(this.theFile);
  this.viewComponent.getFileuploads()
}
}

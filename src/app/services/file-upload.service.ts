import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileToUpload } from '../file-upload/file-to-upload';

const API_URL = "http://localhost:57617/api/fileUpload/";
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    }),
    observe: 'response' as 'body'
};

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) { }

  uploadFile(file) : Observable<FileToUpload> {

    return this.http.post<FileToUpload>(API_URL, file, httpOptions);

  }   
}

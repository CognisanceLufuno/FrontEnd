import { FileToUpload } from '../file-upload/file-to-upload';
import { FileRecord } from '../file-upload/file-record';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

const updaterecordsUrl = 'http://localhost:57617/api/UpdateRecord/';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    }),
    observe: 'response' as 'body'
};

@Injectable({
  providedIn: 'root'
})
export class ViewService {

  constructor(private http: HttpClient) { }

  private getUrl = 'http://localhost:57617/api/GetFileUploads/'; 
  private recordsUrl = 'http://localhost:57617/api/GetFileRecordsByFileId';
  

getFileUploads(): Observable<FileToUpload[]> {
    return this.http.get<FileToUpload[]>(this.getUrl)
}

getFileRecords(fileId : number) : Observable<FileRecord[]> {
  let params = new HttpParams().set("fileId", fileId);
  return this.http.get<FileRecord[]>(this.recordsUrl, {params})
}

UpdateRecord(record : FileRecord) : Observable<FileRecord>  {

  return this.http.post<FileRecord>(updaterecordsUrl, record, httpOptions);
  }
}

import { FileRecord } from 'src/app/file-upload/file-record';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


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
export class ReportService {

  constructor(private http: HttpClient) { }

  updateRecord(record:  FileRecord) : Observable<FileRecord>{
  
    return this.http.post<FileRecord>(updaterecordsUrl, record, httpOptions);
  }
}

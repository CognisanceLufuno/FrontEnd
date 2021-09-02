import { FileToUpload } from './../../file-upload/file-to-upload';
import { FileRecord } from './../../file-upload/file-record';
import { Component, Inject, Injectable, Input, OnInit, TemplateRef, ViewChild } from '@angular/core'
import {ModalComponent } from 'src/app/components/modal/modal.component'
import {ModalConfig } from 'src/app/components/modal/modal.config'


//import {MatSnackBar} from '@angular/material';

import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable} from 'rxjs';
import { SatPopoverAnchor } from '@ncstate/sat-popover';
import { RecordsComponent } from '../records/records/records.component';
import { MatDialog } from '@angular/material/dialog';
import { ViewService } from 'src/app/services/view.service';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.sass']
})

@Injectable({
  providedIn: 'root'
})
export class ViewComponent implements OnInit {

  @ViewChild('modal') private modalComponent!: ModalComponent

  dataSchema = FileRecord;

  constructor(private viewService: ViewService,
    public dialog: MatDialog
    //public snackBar: MatSnackBar,
    ) { }

  ngOnInit(): void {
    this.getFileuploads();
    console.log("below init call");
    
  }

  //fileUploads : FileToUpload[] = [];
  fileUploads :  any;
  currentFileRecords !: FileRecord[];
  latestFileId !: number;
  lastestFileRecords !: FileRecord[];
  exportValues !: number[];
  importValues !: number[];

  getFileuploads(): void {
    
    this.viewService.getFileUploads().
      subscribe(fileUploads => {
        console.log(fileUploads);
    
        this.fileUploads = fileUploads;
        this.latestFileId = fileUploads[0]["id"];
        console.log("latest file set to");
        console.log(fileUploads[0]["id"]);
        this.getLatestFileRecords(this.latestFileId);
      });  
  }
  
  getLatestFileRecords(FileId : number): void {
    console.log(FileId);
    this.viewService.getFileRecords(FileId).
      subscribe((response : FileRecord[]) => {        
        this.lastestFileRecords = response;
        console.log(response);
        this.getValues();
      } 
        );
      }
/*Disclaimer: This is a sad and desperate attempt, born from fatigue - my mind is too tired to think this through :( */ 
  getValues(): void {
    console.log("entered gevalues");
    this.lastestFileRecords.forEach((item, index) => {
      if(item.hourNumber === index){
        this.exportValues.push(item.exportEnergy);
        this.importValues.push(item.importEnergy);
      }     
    });
  }

  displayedColumns = [ 'OperatingDate', 'HourNumber', 'ServicePoint', 'ImportEnergy','ExportEnergy','ImportLeadingReactive', 'ExportLeadingReactive', 'ImportLaggingReactive','ExportLaggingReactive'];
  dataSource = new ODataSource(this.currentFileRecords);

  updateImportEnergy(el: string, importEnergy: number) {
    if (importEnergy == null) { return; }
    // copy and mutate
    const copy = this.dataSource.data().slice()
    //el.comment = comment;
    this.dataSource.update(copy);
  } 
  
  public refreshUploadedFilesList(){
    this.getFileuploads()    
  }

  openModal(selectedFileId : number ) {
      const dialogRef = this.dialog.open(RecordsComponent, {
        width: '95%',
        maxHeight: '90vh',
        maxWidth: '95%',
       data: selectedFileId
    });
  
      
    //}
  //  )
  //}
    // else{
    //   // this.snackBar.open('Certificate failed to save. Please try again.', '', {
    //   //   duration: 5000
    //  // });
    // }; 


    const initialData: FileRecord[] = this.currentFileRecords;
    this.dataSource = new ODataSource(initialData);
    
    //dataSource = this.currentFileRecords;
    //return await this.modalComponent.open()
  }

}

export class ODataSource extends DataSource<any> {

  private dataSubject = new BehaviorSubject<FileRecord[]>([]);

  data() {
    return this.dataSubject.value;
  }

  update(data) {
    this.dataSubject.next(data);
  }

  constructor(data: any[]) {
    super();
    this.dataSubject.next(data);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<FileRecord[]> {
    return this.dataSubject;
  }

  disconnect() {}
}

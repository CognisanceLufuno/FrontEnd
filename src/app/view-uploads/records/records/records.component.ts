import { ReportService } from './../../../services/report.service';
import { DataSource } from '@angular/cdk/collections';
import { JsonpClientBackend } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { EditComponent } from 'src/app/edit/edit/edit.component';
import { FileRecord } from 'src/app/file-upload/file-record';
import { ViewService } from 'src/app/services/view.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.sass']
})
export class RecordsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RecordsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private route: ActivatedRoute,
    private viewService: ViewService,
    private reportService: ReportService,
    public dialog: MatDialog) { }

    sub: any;
    id!:  number;
    displayedColumns = ['Actions', 'OperatingDate', 'HourNumber', 'ServicePoint', 'ImportEnergy','ExportEnergy','ImportLeadingReactive', 'ExportLeadingReactive', 'ImportLaggingReactive','ExportLaggingReactive'];
    currentFileRecords !: FileRecord[];
    dataSource = new ODataSource(this.currentFileRecords);

  ngOnInit(): void {

    this.sub = this.route.queryParams.subscribe(params => {
      this.getFileRecords(this.data);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openModal(selectedrecord : FileRecord ) {
    const dialogRef = this.dialog.open(EditComponent, {
      width: '95%',
      maxHeight: '90vh',
      maxWidth: '95%',
     data: selectedrecord
  });
}

  approveRecord(currentFileRecord : FileRecord){
    currentFileRecord.isApproved = true;
    this.reportService.updateRecord(currentFileRecord);
  }

  getFileRecords(FileId : number): void {
    this.viewService.getFileRecords(FileId).
      subscribe((response : FileRecord[]) => {
        this.dataSource =  new ODataSource(response);
        this.currentFileRecords = response;
      } 
        );
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
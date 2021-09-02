import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FileRecord } from 'src/app/file-upload/file-record';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass']
})
export class EditComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private route: ActivatedRoute,
    private reportService: ReportService) { }

    sub: any;
    currentRecord!: FileRecord;

  ngOnInit(): void {
    this.sub = this.route.queryParams.subscribe(params => {
      this.currentRecord = this.data;
      console.log("the value of the current record is ");
      console.log(JSON.stringify(this.currentRecord));
    });
  }

  updateRecord(currentFileRecord): void{
    this.reportService.updateRecord(currentFileRecord);
  }

  dimiss():void{ 
    this.dialogRef.close();
  }
}

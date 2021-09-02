import { Component, OnInit, Input } from '@angular/core';
import { FileRecord } from 'src/app/file-upload/file-record';
import { ViewService } from 'src/app/services/view.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.sass']
})
export class GraphComponent implements OnInit {
  
  @Input() fileId!: number;

  constructor(private viewService: ViewService) { }
  currentRecords !: FileRecord[];
  exportValues !: number[];
  importValues !: number[];

   
  ngOnInit(): void {
    this.getFileRecords(this.fileId);
    this.getValues();
  }

  getFileRecords(FileId : number): void {
    this.viewService.getFileRecords(FileId).
      subscribe((response : FileRecord[]) => {        
        this.currentRecords = response;

      } 
        );
  }
/*Disclaimer: This is a sad and desperate attempt, born from fatigue - my mind is too tired to think this through :( */ 
  getValues(): void {
    this.currentRecords.forEach((item, index) => {
      if(item.hourNumber === index){
        this.exportValues.push(item.exportEnergy);
        this.importValues.push(item.importEnergy);
      }     
    });
  }
}
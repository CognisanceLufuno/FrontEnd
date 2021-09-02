import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatTableModule } from '@angular/material/table'  
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { ViewComponent } from './view-uploads/view/view.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './components/modal/modal.component';
import { FormsModule } from '@angular/forms';
import { RecordsComponent } from './view-uploads/records/records/records.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditComponent } from './edit/edit/edit.component';
import { GraphComponent } from './graph/graph/graph.component';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { MatTabsModule } from '@angular/material/tabs';
import "hammerjs";

@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
    ViewComponent,
    ModalComponent,
    RecordsComponent,
    EditComponent,
    GraphComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    MatTableModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule, 
    ChartsModule,
    MatTabsModule     
  ],
  entryComponents: [RecordsComponent],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }

import { FileToUpload } from './file-to-upload';
import {} from './file-record'

export class FileRecord {
    id : number = 0;
     uid : string = "";
     fileId : number = 0;        
     operatingDate  !: Date;
     servicePoint !: string;
     hourNumber  : number = 0;
     userId : string = "";
     importEnergy : number = 0;
     exportEnergy : number = 0;
     importLeadingReactive : number = 0;
     exportLeadingReactive : number = 0;
     importLaggingReactive : number = 0;
     exportLaggingReactive : number = 0;
     isOfficial : boolean = false;
     isApproved  : boolean = false;
}
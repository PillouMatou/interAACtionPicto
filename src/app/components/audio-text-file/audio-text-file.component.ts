// bloc-component.ts
import {Component} from '@angular/core';
import {AudioRecorderService} from 'src/app/services/audioRecorder/audio-recorder.service';

@Component({
  selector: 'app-bloc',
  templateUrl: './audio-text-file.component.html',
  styleUrls: ['./audio-text-file.component.css']
})
export class AudioTextFileComponent {


  offcanvas: string = "";
  closeButton: string = "";
  navbarButton: string = "";
  text: string = "";
  navTabs: string = "";
  buttonAdd: string = "";

  // audio file attributes
  nameSound: string = "";
  soundToListen: any = "";
  isRecording: boolean = false;
  //soundToZip: any = "";

  // audio file (selection)
  acceptedFile: string[] = ["mp3", "wav"];
  recordedSongToListen: any = "";
  showErrorDropFile: boolean = false;
  showFile: boolean = false;
  showFileUpload: boolean = false;
  uploadFileProgress: string = "width: 0%";
  disableAddSongButton: boolean = true;

  // error message
  errorDropFile: string = "";
  showErrorRecord: boolean = false;
  showErrorText: boolean = false;


  isActive: boolean = false;


  constructor(private audioRecorderService: AudioRecorderService) {
  }

  toggleBlock() {
    this.isActive = !this.isActive;
  }

  checkFile(song: any) {
    const songName: string = song.name;
    const getExtension: string[] = songName.split(".");
    return this.acceptedFile.includes(getExtension[getExtension.length - 1]);
  }

  addSong() {
    /*
    this.showErrorDropFile = false;
    this.showErrorRecord = false;
    this.showErrorText = false;

    const index = this.evalJsonService.index;
    this.evalJsonService.songToDisplay[index][0] = this.nameSound;
    this.evalJsonService.songToDisplay[index][1] = this.soundToListen;
    this.evalJsonService.songToDisplay[index][2] = this.soundToZip;

    this.audioRecorderService.audioObservable.next("");
    this.reset();*/
  }

  recording() {
    if (this.isRecording) {
      this.stopRecord();
    } else {
      this.startRecord();
    }
  }

  startRecord() {
    this.isRecording = true;
    this.audioRecorderService.startRecording();
  }

  stopRecord() {
    this.isRecording = false;
    this.audioRecorderService.stopRecording();
    setTimeout(() => {
      this.soundToListen = this.audioRecorderService.audioUrl;
      //this.soundToZip = this.audioRecorderService.audioBlob;
    }, 500);
    //this.checkRecord();
  }

  getNameRecord(value: any){
    this.nameSound = value.target.value;
    this.checkRecord();
    this.showErrorRecord = this.nameSound == "";
    this.nameSound = this.nameSound  + ".wav";
  }

  checkRecord(){
    this.disableAddSongButton = !((this.nameSound != "") && (this.soundToListen != ""));
  }

  getText(value: any){
    this.nameSound = value.target.value;
    this.checkText();
    this.showErrorText = this.nameSound == "";
  }

  checkText(){
    this.disableAddSongButton = !(this.nameSound != "");
  }

  listenText(){
    this.audioRecorderService.speechSynthesis(this.nameSound);
  }

  dropFile(value: any) {
    const song = value.addedFiles[0];
    const reader = new FileReader();
    if (this.checkFile(song)) {
      this.showErrorDropFile = false;
      try {
        reader.readAsDataURL(song);
        reader.onload = () => {
          this.showFileUpload = true;

          let progressUpload: number = 0;
          const progressInterval = setInterval(() => {
            if (progressUpload < 99) {
              progressUpload += 5;
              this.uploadFileProgress = "width: " + progressUpload + "%";
            } else {
              clearInterval(progressInterval);
              setTimeout(() => {
                this.nameSound = song.name;
                this.soundToListen = String(reader.result);
                //this.soundToZip = song;

                this.showFileUpload = false;
                this.showFile = true
                this.disableAddSongButton = false;
              }, 1000);
            }
          }, 200);
        };
      } catch (e) {
        this.errorDropFile = " Le fichier est corrompu, impossible de le charger ! ";
        this.showErrorDropFile = true;
      }
    } else {
      this.errorDropFile = " Le fichier n'est pas un format que l'on accepte, mp3 ou wav seulement ! ";
      this.showErrorDropFile = true;
    }
  }

  removeFile() {
    this.nameSound = "";
    this.soundToListen = "";
    //this.soundToZip = "";

    this.showFile = false;
  }

  reset(){
    this.nameSound = "";
    this.soundToListen = "";
    //this.soundToZip = "";
    this.uploadFileProgress = "width: 0%";

    this.showErrorDropFile = false;
    this.showErrorRecord = false;
    this.showErrorText = false;
    this.showFile = false;
    this.showFileUpload = false;
    this.disableAddSongButton = true;
    this.isRecording = false;
  }

}

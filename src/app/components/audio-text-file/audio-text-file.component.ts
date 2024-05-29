// bloc-component.ts
import {Component} from '@angular/core';
import {AudioRecorderService} from 'src/app/services/audioRecorder/audio-recorder.service';
import {AudioTextFileShareService} from "../../services/AudioTextFileShare/audio-text-file-share.service";

declare var getLemmaText:any;
declare var lemmaText:any;

@Component({
  selector: 'app-audio-text-file',
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

  disableAddPhraseButton: boolean = true;
  selectedPredefinedPhrase: string = '';

  // Lemmatisation
  textToLemmatise: string = "";
  lemmatisedText: string[] = [""];
  inputText: string = "";

  // error message
  errorDropFile: string = "";
  showErrorRecord: boolean = false;
  showErrorText: boolean = false;



  isActive: boolean = false;


  constructor(private audioRecorderService: AudioRecorderService,
              private audioTextFileShareService: AudioTextFileShareService,) {
  }

  toggleBlock() {
    this.isActive = !this.isActive;
  }

  checkFile(song: any) {
    const songName: string = song.name;
    const getExtension: string[] = songName.split(".");
    return this.acceptedFile.includes(getExtension[getExtension.length - 1]);
  }

  addSong(method: string) {

    if (method == "file" || method == "record") {
      // Whisper
      // Lemmatisation

    }else{

      // Lemmatisation
      this.lemmatiseText(method);

    }

  }

  lemmatiseText(method: string) {

    if (method == "selection") {
      this.textToLemmatise = this.selectedPredefinedPhrase;
    }

    if (method == "input") {
      this.textToLemmatise = this.inputText;

    }

    let textLemma: string[] = [""];
    lemmaText(this.convertTextToString(this.textToLemmatise));
    let lemmaTextInterval = setInterval(() => {
      if (textLemma[0] == ""){
        textLemma = getLemmaText();
        this.lemmatisedText = textLemma;
        this.audioTextFileShareService.setLemmatisedText(this.lemmatisedText);
      }else {
        clearInterval(lemmaTextInterval);
      }
    }, 200);



  }

  convertTextToString(text: any){
    text = text.replace("[", "");
    text = text.replace("]", "");
    text = text.replaceAll(',', "");
    text = this.getTextWhitoutChariot(text);
    return text;
  }

  getTextWhitoutChariot(text: string){
    if (text.includes("\r") || text.includes("\n")){
      text = text.replace(/\n|\r/g,'');
      return text;
    }else {
      return text;
    }
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

  updateButtonState() {
    this.disableAddPhraseButton = this.selectedPredefinedPhrase === '';
  }

  selectPredefinedPhrase(event: any) {
    this.selectedPredefinedPhrase = event.target.value;
    this.updateButtonState(); // Appel de la fonction pour mettre à jour l'état du bouton Valider
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

import { Component, OnInit } from '@angular/core';
import { AudioRecorderService } from 'src/app/services/audioRecorder/audio-recorder.service';

@Component({
  selector: 'app-speech-to-picto',
  templateUrl: './speech-to-picto.component.html',
  styleUrls: ['./speech-to-picto.component.css']
})
export class SpeechToPictoComponent implements OnInit {

  isRecording: boolean = false;
  soundToListen: any = "";
  recordedSongToListen: any = "";



  constructor(private audioRecorderService: AudioRecorderService,
              /*public sanitizer: DomSanitizer*/) { }

  ngOnInit(): void {
  }





}

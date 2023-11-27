import { HtmlParser } from '@angular/compiler';
import { AfterContentChecked, AfterContentInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { videoService } from '../video.service';

@Component({
  selector: 'app-tik-tok-seek-bar',
  templateUrl: './tik-tok-seek-bar.component.html',
  styleUrls: ['./tik-tok-seek-bar.component.css']
})
export class TikTokSeekBarComponent implements OnInit {
  @Input('video') video: HTMLVideoElement;
  @Input('contID') contID: string = 'SeekCont';
  @ViewChild('inputRange', { static: true }) inputRange: ElementRef;
  @ViewChild('seekFill', { static: true }) fill: ElementRef;
  focused: boolean = false;
  constructor(private videoService: videoService) { }

  ngOnInit(): void {
    this.contID += ++this.videoService.seekID;
    setTimeout(() => {
      this.video.addEventListener('timeupdate', (event) => {
        if (this.focused) {
          return;
        }
        else {
          let video = event.target as HTMLVideoElement;
          this.inputRange.nativeElement.value = video.currentTime + "";
          this.fill.nativeElement.setAttribute('style', 'width:' + (+this.inputRange.nativeElement.value * 100 / +this.inputRange.nativeElement.max) + '%');
        }
      })
    }, 1000);
  }

  setBar(inputRange: HTMLInputElement, seekFill: HTMLElement) {
    this.focused = true;
    seekFill.style.width = (+inputRange.value * 100 / +inputRange.max) + '%';
  }

  seekTo(inputRange: HTMLInputElement, seekFill: HTMLElement) {
    this.video.currentTime = +inputRange.value;
    seekFill.style.width = (+inputRange.value * 100 / +inputRange.max) + '%';
    this.focused = false;
  }

}

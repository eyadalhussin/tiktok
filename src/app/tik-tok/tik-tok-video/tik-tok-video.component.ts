import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TVideo } from '../modules/video.module';
import { videoService } from '../video.service';

@Component({
  selector: 'app-tik-tok-video',
  templateUrl: './tik-tok-video.component.html',
  styleUrls: ['./tik-tok-video.component.css'],
  animations: [
    trigger('heart', [
      state('shown', style({
        'transform': 'scale(1.1)',
        'opacity': 1
      })),
      state('hidden', style({
        'transform': 'scale(0.9)',
        'opacity': 0,
      })),
      transition('shown <=> hidden', animate(300))
    ])
  ]
})
export class TikTokVideoComponent implements OnInit, OnDestroy {
  TVideo: TVideo;
  fav = false;
  heartState = 'hidden';

  video: HTMLVideoElement;
  contID: string = 'SeekCont';

  @ViewChild('inputRange', { static: true }) inputRange: ElementRef;
  @ViewChild('seekFill', { static: true }) fill: ElementRef;
  focused: boolean = false;

  constructor(private videoService: videoService) {
  }
  ngOnDestroy(): void {
    this.videoService.activeVidNr = 1;
  }

  ngOnInit(): void {
    this.TVideo = this.videoService.activeVideo;
    this.videoService.activeVidNr = this.TVideo.id;
    this.video = document.getElementById('userVideo') as HTMLVideoElement;
    setTimeout(() => {
      this.video.play();
    }, 1000);

    this.contID += ++this.videoService.seekID;
    console.log(this.contID);
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

  play(video: HTMLVideoElement) {
    this.videoService.commenting.next(false);
    this.videoService.commentBarOpened.next(false);
    video.paused ? video.play() : video.pause();
  }

  toggleUser() {
    this.videoService.selectedNav.next('User');
  }

  like() {
    if (!this.TVideo.liked) {
      this.heartState = 'shown';
      setTimeout(() => {
        this.heartState = 'hidden';
      }, 300);
      this.TVideo.likes++;
      this.TVideo.liked = true;
    }
    else {
      this.TVideo.likes--;
      this.TVideo.liked = false;
    }
  }

  toggleComment() {
    this.videoService.commenting.next(true);
    this.videoService.commentBarOpened.next(true);
  }

  addFav() {
    if (!this.fav) {
      this.TVideo.favorites++;
      this.fav = true;
    }
    else {
      this.TVideo.favorites--;
      this.fav = false;
    }
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

  setNav() {
    this.videoService.selectedNav.next('User');
    this.videoService.commenting.next(false);
    this.videoService.commentBarOpened.next(false);
  }

}

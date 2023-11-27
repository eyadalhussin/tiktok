import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewChecked, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { throwMatDuplicatedDrawerError } from '@angular/material/sidenav';
import { TVideo } from '../modules/video.module';
import { videoService } from '../video.service';

@Component({
  selector: 'app-tik-tok-post',
  templateUrl: './tik-tok-post.component.html',
  styleUrls: ['./tik-tok-post.component.css'],
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
export class TikTokPostComponent implements OnInit {
  @Input('TVideo') TVideo: TVideo;
  fav: boolean = false;
  heartState = 'hidden';
  isPaused: boolean = false;
  commentOpen: boolean = false;
  constructor(private videoService: videoService) {

  }

  ngOnInit(): void {
    this.videoService.commenting.subscribe(erg => this.commentOpen = erg);
  }

  play(video: HTMLVideoElement) {
    if (this.commentOpen) {
      this.videoService.commenting.next(false);
      return;
    }
    else {
      if (video.paused) {
        video.play();
        this.isPaused = false;
      } else {
        video.pause();
        this.isPaused = true;
      }
    }
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

  toggleComment() {
    this.videoService.commenting.next(true);
    // let commentCont = document.querySelector('.mainCommentCont') as HTMLElement;
    // commentCont.style.width = document.documentElement.clientWidth + 'px';
    // commentCont.style.height = document.documentElement.clientHeight * 60  / 100 + 'px';
    // commentCont.style.width = '50px';
    this.videoService.commentBarOpened.next(true);

    console.log('fixing');
  }

  toggleUser() {
    this.videoService.selectedNav.next('User');
    let video = document.getElementById('vid' + this.videoService.videos[this.videoService.activeVidNr - 1].id) as HTMLVideoElement;
    video.pause();
  }
}

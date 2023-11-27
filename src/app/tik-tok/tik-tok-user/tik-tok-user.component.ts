import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { TVideo } from '../modules/video.module';
import { videoService } from '../video.service';

@Component({
  selector: 'app-tik-tok-user',
  templateUrl: './tik-tok-user.component.html',
  styleUrls: ['./tik-tok-user.component.css'],
  animations: [
    trigger('followBtn', [
      state('Follow', style({
        'background-color': '#ff0050',
        'color': '#ffffff',
        'border': '2px solid #ff0050',
      })),
      state('Following', style({
        'background-color': '#ffffff',
        'border': '2px solid #999999',
        'color': '#999999'
      })),
      transition('Follow <=> Following', animate(200))
    ])
  ]
})
export class TikTokUserComponent implements OnInit {

  selectedNav: string;
  selectedGridIcon: string;
  videos: TVideo[] = [];
  followState = 'Follow';
  notificationSelected:boolean;

  constructor(private videoService: videoService) {

  }

  ngOnInit(): void {
    this.videoService.selectedNav.subscribe(erg => this.selectedNav = erg);
    this.selectedGridIcon = 'videos';
    this.videos = this.videoService.videos;
    this.notificationSelected = false;
  }

  returnToHome() {
    this.videoService.selectedNav.next('Home');
  }

  toggleGridIcon(val: string) {
    this.selectedGridIcon = val;
  }

  toggleFollow() {
    this.followState == 'Follow' ? this.followState = 'Following' : this.followState = 'Follow';
  }

  openVideo(video:TVideo){
    this.videoService.activeVideo = video;
    this.videoService.selectedNav.next('Video');
    console.log('OOOOOOOOOOOOOOOOOOOOOO');
    
  }

  toggleBell(){
    this.notificationSelected = !this.notificationSelected;
  }
}

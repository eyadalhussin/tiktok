import { Component, Input, OnInit } from '@angular/core';
import { videoService } from '../video.service';

@Component({
  selector: 'app-tik-tok-search',
  templateUrl: './tik-tok-search.component.html',
  styleUrls: ['./tik-tok-search.component.css']
})
export class TikTokSearchComponent implements OnInit {

 @Input('desc') desc:string;

  constructor(private videoService: videoService) { }

  ngOnInit(): void {
  }

  setNav(nav:string){
    let el = document.querySelector('.bodyContainer') as HTMLElement;
    if(nav != 'Home'){
      el.style.overflowY = 'Hidden';
    } else {
      el.style.overflowY = 'Scroll';
    }
    this.videoService.selectedNav.next(nav);
    nav != 'Home' ? this.pauseOnNav() : this.playOnNav();
  }

  pauseOnNav(){
    let video = document.getElementById('vid'+this.videoService.videos[this.videoService.activeVidNr-1].id) as HTMLVideoElement;
    video.pause();
  }

  playOnNav(){
    let video = document.getElementById('vid'+this.videoService.videos[this.videoService.activeVidNr-1].id) as HTMLVideoElement;
    video.play();
  }

}

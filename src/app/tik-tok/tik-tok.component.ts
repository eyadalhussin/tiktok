import { AfterViewChecked, Component, HostBinding, OnInit } from '@angular/core';
import { TVideo } from './modules/video.module';
import { videoService } from './video.service';

@Component({
  selector: 'app-tik-tok',
  templateUrl: './tik-tok.component.html',
  styleUrls: ['./tik-tok.component.css']
})

export class TikTokComponent implements OnInit {
  videos: TVideo[] = [];
  observer: IntersectionObserver;
  selectedNav:string = 'Home';
  forYou:boolean = true;
  commenting:boolean = false;
  commentBarOpened:boolean = false;
  isLoading = true;
  constructor(private videoService: videoService) {
  }

  ngOnInit(): void {
    this.videos = this.videoService.videos;
    this.videoService.selectedNav.subscribe(erg => this.selectedNav = erg);
    this.selectedNav = 'Home';
    setTimeout(() => {
      this.isLoading = false;
      this.run();
    }, 2900);
    if(document.documentElement.clientWidth <= 480){
      let bbody = document.querySelector('.mainContainer') as HTMLElement;
      bbody.style.width = document.documentElement.clientWidth + 'px';
      bbody.style.height = document.documentElement.clientHeight + 'px';
    }

    this.videoService.commenting.subscribe(erg => this.commenting = erg);
    this.videoService.commentBarOpened.subscribe(erg => {
      this.commentBarOpened = erg
      console.log(erg);
      
    }
      );
  }

  run() {
    const components = document.querySelectorAll('.video');

    let options = {
      rootMargin: '0px 0px 0px 0px',
      threshold: 0.8
    }

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        let t = entry.target as HTMLVideoElement;
        if (entry.isIntersecting) {
          t.play();
          this.videoService.activeVidNr = +t.id.substring(3,4);
          // this.videoService.activeComments.next(this.videoService.videos[+t.id.substring(3,4)].comments);
        }
        else {
          t.currentTime = 0;
          t.pause();
        }
      })
    }, options);

    components.forEach(comp => {
      this.observer.observe(comp);
    })
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

  toggleComment(erg:boolean){
    this.commenting = erg;
  }

  pauseOnNav(){
    let video = document.getElementById('vid'+this.videoService.videos[this.videoService.activeVidNr-1].id) as HTMLVideoElement;
    console.log(video);
    video.pause();
  }

  playOnNav(){
    let video = document.getElementById('vid'+this.videoService.videos[this.videoService.activeVidNr-1].id) as HTMLVideoElement;
    console.log(video);
    video.play();
  }



}
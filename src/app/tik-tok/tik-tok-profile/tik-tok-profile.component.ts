import { Component, OnInit } from '@angular/core';
import { videoService } from '../video.service';

@Component({
  selector: 'app-tik-tok-profile',
  templateUrl: './tik-tok-profile.component.html',
  styleUrls: ['./tik-tok-profile.component.css']
})
export class TikTokProfileComponent implements OnInit {
  currentUser:string;
  constructor(private videoService: videoService) { }

  ngOnInit(): void {
    this.currentUser = this.videoService.currentUser;
  }

}

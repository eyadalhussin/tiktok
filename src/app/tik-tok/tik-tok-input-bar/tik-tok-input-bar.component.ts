import { Component, OnInit } from '@angular/core';
import { TReply } from '../modules/reply.module';
import { videoService } from '../video.service';

@Component({
  selector: 'app-tik-tok-input-bar',
  templateUrl: './tik-tok-input-bar.component.html',
  styleUrls: ['./tik-tok-input-bar.component.css']
})
export class TikTokInputBarComponent implements OnInit {

  constructor(private videoService:videoService) { }

  ngOnInit(): void {
  }

  addComment(input){
    if(this.videoService.activeComment != null){
      this.videoService.activeComment.replies.unshift(new TReply(this.videoService.currentUser, input.value, 0, new Date(), false));
      input.value = '';
      input.placeholder = 'Add comment ...';
      this.videoService.activeComment = null;
      return;
    }
    else{
      this.videoService.addComment(input.value);
      input.value = '';
      return;
    }
  }

}

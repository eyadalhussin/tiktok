import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { TComment } from '../modules/comment.module';
import { TReply } from '../modules/reply.module';
import { videoService } from '../video.service';

@Component({
  selector: 'app-tik-tok-comment',
  templateUrl: './tik-tok-comment.component.html',
  styleUrls: ['./tik-tok-comment.component.css']
})
export class TikTokCommentComponent implements OnInit, AfterContentInit {
  @Input('commentAnz') commentAnz: string;
  comments: TComment[];
  activeComment:TComment;

  constructor(private videoService: videoService) { }

  ngOnInit(): void {
    console.log('init');
  }

  ngAfterContentInit(): void {
    this.comments = this.videoService.videos[this.videoService.activeVidNr - 1].comments;
  }

  closeComment() {
    this.videoService.commenting.next(false);
  }
  
  scrollTo() {
    document.querySelector('#cInput').scrollIntoView();
    console.log('scrolling');
  }
  
  incLikes(comment:TComment){
    if(!comment.liked){
      comment.liked = true;
      comment.likes++;     
    } else {
      comment.liked = false;
      comment.likes--;
    }
    return;
  }
  
  incLikesRep(reply:TReply){
    if(!reply.liked){
      reply.liked = true;
      reply.likes++;    
    } else {
      reply.liked = false;
      reply.likes--;
    }
    return;
  }
  
  addComment(input){
    this.videoService.addComment(input.value);
    input.value = '';
  }

  toggleInput(comment:TComment){
    this.videoService.activeComment = comment;
    let input = document.querySelector('.commentInput') as HTMLInputElement;
    input.placeholder = 'Add reply...';
    input.focus();
  }

}

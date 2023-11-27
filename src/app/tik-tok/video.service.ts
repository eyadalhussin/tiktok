import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { TComment } from "./modules/comment.module";
import { TReply } from "./modules/reply.module";
import { TVideo } from "./modules/video.module";

@Injectable({ providedIn: 'root' })
export class videoService {
    videos: TVideo[];
    id:number;
    commenting = new Subject<boolean>();
    activeVidNr:number = 1;
    activeComment:TComment;
    currentUser:string = '@edevGuest';
    currentLikes = new Subject<number>();
    commentBarOpened = new Subject<boolean>();
    selectedNav = new Subject<string>();
    activeVideo:TVideo;
    seekID = 0;

    constructor() {
        this.id = 0;
        this.videos = [];
        this.videos.push(new TVideo(++this.id,'@edev1997', 'assets/TikTok/Videos/Tokyo1.mp4', 'This Here is The Second Video', 72,false, [], 10, 'assets/TikTok/Icons/AlanWalker.jpg', 'Em Eyad Doing Something',540));
        this.videos.push(new TVideo(++this.id,'@edev1997', 'assets/TikTok/Videos/MineSweeper.mp4', '#Wow #Omg #Ok', 1400,false, [], 80, 'assets/TikTok/Icons/AlanWalker.jpg', 'Em Eyad Doing Something',1200));
        this.videos.push(new TVideo(++this.id,'@edev1997', 'assets/TikTok/Videos/PDF-Editor.mp4', 'This Here is The Second Video', 6300,false, [], 30, 'assets/TikTok/Icons/AlanWalker.jpg', 'Em Eyad Doing Something',400));
        this.init();
    }

    init(){
        let commi = new TComment('@honololo', 'First Commi :D', 86, new Date(), false,[], false);
        let commi2 = new TComment('@BadGuy421', 'Not Bad', 7, new Date(), false,[], false);
        let commi3 = new TComment('@TheOnesdf', 'How did you do this Algorithm ?', 2, new Date(), false,[], false);
        let commi4 = new TComment('@Alot of Time', 'NO', 20, new Date(), false,[], false);
        let commi5 = new TComment('@Cannoa', 'Nice Song Tho', 30, new Date(), false,[], false);
        let commi6 = new TComment('@msdff', 'i am dummy commi', 10, new Date(), false,[], false);
        let commi7 = new TComment('@User63263262', 'wow wow', 50, new Date(), false,[], false);
        let commi8 = new TComment('@Somfffh', 'everytime', 10, new Date(), false,[], false);

        let reply1 = new TReply('@Somfffh', 'everytime', 2, new Date(), false);
        let reply2 = new TReply('@User63263262', 'everytime', 0, new Date(), false);
        let reply3 = new TReply('@msdff', 'everytime', 1, new Date(), false);
        let reply4 = new TReply('@Somfffh', 'everytime', 4, new Date(), false);



        this.videos[0].comments.unshift(commi);
        this.videos[0].comments.unshift(commi2);
        this.videos[0].comments.unshift(commi3);
        this.videos[0].comments.unshift(commi4);
        this.videos[0].comments.unshift(commi5);
        this.videos[0].comments.unshift(commi6);
        this.videos[0].comments.unshift(commi7);
        this.videos[0].comments.unshift(commi8);

        
        this.videos[0].comments[0].replies.unshift(reply1);
        this.videos[0].comments[0].replies.unshift(reply2);
        this.videos[0].comments[0].replies.unshift(reply3);
        this.videos[0].comments[0].replies.unshift(reply4);
    
    }

    addComment(comment:string){
        let commi = new TComment(this.currentUser, comment, 0, new Date(), false,[], false);
        this.videos[this.activeVidNr-1].comments.unshift(commi);
    }

    addReply(comment:TComment,reply: string, user:string){
        let rep = new TReply(user, reply, 0, new Date(), false);
        comment.replies.unshift(rep);
    }

}
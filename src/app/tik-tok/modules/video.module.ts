import { TComment } from "./comment.module";

export class TVideo {
    id: number;
    user: string;
    videoSrc: string;
    desc: string;
    likes: number;
    liked:boolean;
    comments: TComment[];
    favorites: number;
    soundIcon: string;
    soundText: string;
    views:number;

    constructor(
        id: number,
        user: string,
        videoSrc: string,
        desc: string,
        likes: number,
        liked:boolean,
        comments: TComment[],
        favorites: number,
        soundIcon: string,
        soundText: string,
        views:number) {
        this.id = id;
        this.user = user;
        this.videoSrc = videoSrc;
        this.desc = desc;
        this.likes = likes;
        this.liked = liked;
        this.favorites = favorites;
        this.comments = comments;
        this.soundIcon = soundIcon;
        this.soundText = soundText;
        this.views = views;
    }
}
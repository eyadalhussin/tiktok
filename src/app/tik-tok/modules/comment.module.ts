import { TReply } from "./reply.module";

export class TComment {
    constructor(
        public user: string,
        public text: string,
        public likes: number,
        public CDate: Date,
        public liked:boolean,
        public replies: TReply[],
        public replyToggled:boolean
    ) 
    {}
}
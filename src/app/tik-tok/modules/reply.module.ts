export class TReply{
    constructor(
        public user:string,
        public text: string,
        public likes: number,
        public CDate: Date,
        public liked:boolean
    ){}
}
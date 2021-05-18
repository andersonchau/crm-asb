
// This file logged in user info
export class Notice {
    id: number;
    msg: string;
    status : string;
    createDate : Date;


    constructor(id: number, msg: string, status: string, createDate : Date ){
        this.id = id;
        this.msg = msg;
        this.status = status;
        this.createDate = createDate;
    }
    static getDummyNoticeList() : Notice[] {
        var noticeList : Notice[] = [];
        noticeList.push(new Notice(1,'Company Established','A',new Date()));
        noticeList.push(new Notice(2,'Please submit the document','A',new Date()));
         return noticeList;
    }
}
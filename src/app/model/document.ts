
// This file logged in user info
export class Document {
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
    static getDummyDocumentList() : Document[] {
        var documentList : Document[] = [];
        documentList.push(new Document(1,'Financial Statement','A',new Date()));
        documentList.push(new Document(2,'Legal Document','A',new Date()));
        documentList.push(new Document(3,'For testing, Please Delete','A',new Date()));
        return documentList;
    }
}
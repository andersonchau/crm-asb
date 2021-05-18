
// This file logged in user info
export class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    companyId: number;
    token?: string;
    

    constructor(id: number , username: string, password: string, 
        firstname: string , lastname:  string, companyId: number, token?: string ){
        this.id = id;
        this.username = username;
        this.password = password;
        this.firstName = firstname;
        this.lastName = lastname; 
        this.companyId = companyId;
        this.token = token;
       
        }

    static getInvalidatedUser():User {
       return new User(-1,'','','','',-1,undefined);
    }
}
export class User {
    userName :string;
    email:string;
    password:string;
    constructor(un :string, e :string, p:string){
        this.userName=un;
        this.email=e;
        this.password=p;
    }
}
import { Role } from "./role";

export class User{
    constructor(
        public email:string,
        public password:string,
        public role?:Role,
        public name?:string
    ){}
}
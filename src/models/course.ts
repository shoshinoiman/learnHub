export class Course{
    constructor(
        public description:string,
        public title:string,
        public teacherId:number,
        public id:number,
        public showLessons:boolean=false,
        public isEnrolled:boolean=false
    ){}
}
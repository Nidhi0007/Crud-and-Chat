export interface IUser{
    _id?:string
    password:string
    email:string
    username:string
    comparePassword(password:string):boolean
}
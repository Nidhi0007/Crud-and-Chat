export interface IUser{
    _id?:string
    password:string
    email:string
    comparePassword(password:string):boolean
}
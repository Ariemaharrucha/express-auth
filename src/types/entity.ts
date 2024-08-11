export interface ITodo {
    userId: string,
    todo: string,
    date: string
}

export interface IUser {
    name: string,
    email: string,
    password: string
}

export interface IAuth {
    email: string,
    password: string
}
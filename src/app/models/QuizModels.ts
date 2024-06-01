export class UserLogin {
    userName: string;
    password: string;
}

export class User {
    id: number;
    userName: string;
    password: string;
    avatar: Avatar;
}
export class Avatar{
    id: number;
    name: string;
    image: string;
}
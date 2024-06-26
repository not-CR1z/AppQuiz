export class UserLogin {
    userName: string;
    password: string;
}

export class Quiz {
    id?: number;
    name: string;
    description: string;
    attemps: number;
    categoryId: Category;
    creatorId: number;
    questions?: Question[];
    stats: Stats[];
}

export class Question {
    id?: number;
    name: string;
    answers: Answer[];
    quizId: number;
}

export class Answer {
    id?: number;
    name: string;
    isTrue: boolean;
    questionId?: number;
}

export class User {
    id: number;
    userName: string;
    password: string;
    avatar: Avatar;
    avatarId?: number;
}

export class Avatar {
    id: number;
    name: string;
    image: string;
}

export class Category {
    id: number;
    name: string;
    image: string;
}

export class Stats{
    id: number;
    quizId: number;
    starRating: number;
}

export class ChangePassDto {
    userId: number;
    currentPassword: string;
    newPassword: string;
}
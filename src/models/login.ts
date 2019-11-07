export class userData {
    object:data;
    token:string;
}

class data{
    id: number;
    name: string;
    email: string;
    password: string;
    profileImageUrl: string;
}


export class questionData {
    id: number;
    title: string;
    description: string;
    date: string;
    question_status: Question_Status;
    up_votes: number;
    down_votes: number;
}

enum Question_Status {
    ANSWERED, NOT_ANSWERD
}
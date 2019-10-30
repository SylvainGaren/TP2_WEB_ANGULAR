import { User } from '../model/user';

export class AddRecap {
    static readonly type = '[User] Add';

    constructor(public userRecap: User) {}
    
}


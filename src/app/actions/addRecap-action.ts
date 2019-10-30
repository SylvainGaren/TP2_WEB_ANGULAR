import { User } from '../model/user';

export class AddRecap {
    static readonly type = '[UserRecap] Add';

    constructor(public userRecap: User) {}
    
}


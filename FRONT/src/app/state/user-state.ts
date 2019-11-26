import {NgxsModule,Action,Selector,State, StateContext} from '@ngxs/store';
import { UserStateModel } from './user-state-model';
import { AddRecap } from '../actions/addRecap-action';

@State<UserStateModel>({
    name: 'users',
    defaults: {
        users: []
    }
})

export class UserState {

  @Selector()
    static getUser(state: UserStateModel) {
        return state.users;
    }

@Action(AddRecap)
    add({getState, patchState }: StateContext<UserStateModel>, { userRecap }: AddRecap) {
        const state = getState();
        patchState({
            users: [...state.users, userRecap]
        });
    }
}

import { IUserState, UserAction, UserActionTypes } from "../../types/user"

const initialState: IUserState = {
    users: [],
    loading: false,
    error: null
}  

export const userReducer = (state = initialState, action:UserAction): IUserState => {
    switch(action.type) {
        case UserActionTypes.FETCH_USERS: 
            return {loading: true, error: null, users: [] }
        case UserActionTypes.FETCH_USERS_SUCCESS: 
            return {loading: false, error: null, users: action.payload }
        case UserActionTypes.FETCH_USERS_ERROR: 
            return {loading: false, error: action.payload, users: [] }
        case UserActionTypes.DELETE_USER: 
            return {...state, users: action.payload}
        case UserActionTypes.EDIT_USER: 
            return {...state, users: action.payload}
        default: return state
    }
}
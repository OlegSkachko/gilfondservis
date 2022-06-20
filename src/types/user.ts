
export enum UserActionTypes {
    FETCH_USERS = "FETCH_USERS",
    FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS",
    FETCH_USERS_ERROR = "FETCH_USERS_ERROR",
    DELETE_USER = "DELETE_USER",
    EDIT_USER = "EDIT_USER"
}

export interface IUserState {
    users: IUser[]
    loading: boolean
    error: null | string
}

interface IFetchUserAction {
    type: UserActionTypes.FETCH_USERS
}

interface IFetchUserSuccessAction {
    type: UserActionTypes.FETCH_USERS_SUCCESS
    payload: IUser[]
}

interface IFetchUserErrorAction {
    type: UserActionTypes.FETCH_USERS_ERROR
    payload: string
}

interface IDeleteUserAction {
    type: UserActionTypes.DELETE_USER
    payload: IUser[]
}

interface IEditUserAction {
    type: UserActionTypes.EDIT_USER
    payload: IUser[]
}

export interface IUser {
    id: string, 
    name:  string, 
    username?: string, 
    email?: string,
}

export interface IModalProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    type: string
    id: string
}

export type UserAction = IFetchUserAction | IFetchUserSuccessAction | IFetchUserErrorAction | IDeleteUserAction | IEditUserAction

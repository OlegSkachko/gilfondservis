import {IUser, UserAction, UserActionTypes} from "../../types/user";
import {Dispatch} from "redux";
import axios from "axios";

export const fetchUsers = () => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            dispatch({type: UserActionTypes.FETCH_USERS})
            const response = await axios.get('https://jsonplaceholder.typicode.com/users')
            setTimeout(() => {
                dispatch({type: UserActionTypes.FETCH_USERS_SUCCESS, payload: response.data})
            }, 500)
        } catch (e) {
            dispatch({
                type: UserActionTypes.FETCH_USERS_ERROR,
                payload: 'Произошла ошибка при загрузке пользователей'
            })
        }
    }
}

export const deleteUser = (id: string, users: IUser[]) => {
    const newUsers = users.filter(user=>user.id !== id)
        return (dispatch: Dispatch<UserAction>) => {
            dispatch({type: UserActionTypes.DELETE_USER, payload:  newUsers })
    }
}

export const editUser = (id: string, newUser: IUser, users: IUser[]) => {
    const newUsers = users.map(user=> {
        if(user.id === id) {
            return {...newUser}
        }
        return {...user}
    })
        return (dispatch: Dispatch<UserAction>) => {
            dispatch({type: UserActionTypes.DELETE_USER, payload: newUsers })
    }
}


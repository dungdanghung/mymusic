import { useContext, createContext, useReducer } from 'react'

const UserContext = createContext()

const USER_ACTION = {
    SET: 'SET',
    REMOVE: 'REMOVE'
}

function userReducer(state, action) {
    switch (action.type) {
        case USER_ACTION.SET:
            return {
                ...action.payload
            }
        case USER_ACTION.REMOVE:
            return null
        default:
            return state;
    }
}


function UserProvider({ children }) {
    const [user, dispatchUser] = useReducer(userReducer, null)
    return (
        <UserContext.Provider value={[user, dispatchUser]}>
            {children}
        </UserContext.Provider>
    )
}

function useUserData() {
    return useContext(UserContext)
}

export {
    useUserData,
    USER_ACTION,
}
export default UserProvider
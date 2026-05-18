import { createContext, useContext, useReducer } from "react";



const AuthContext = createContext();

const initialState = {
    user: null,
    isAuthenticated: false
}

function reducer(state, action) {
    switch (action.type) {
        case 'login': {
            return {
                user: action.payload,
                isAuthenticated: true
            }
        }
        case 'logout': {
            return {
                user: null,
                isAuthenticated: false
            }
        }
        default:
            throw new Error(`Unsupported action type: ${action.type}`);
    }
}

const FACK_USER = {
    Name: "Jack",
    Email: "jack@example.com",
    password: "qwerty",
    avaatar: "https://i.pravatar.cc/150?img=2"

};


function AuthProvider({ children }) {

    const [{ user, isAuthenticated }, dispatch] = useReducer(reducer, initialState);

    function login(email, password) {
        if (email === FACK_USER.Email && password === FACK_USER.password)
            dispatch({ type: 'login', payload: FACK_USER });
    }

    function logout() {
        dispatch({ type: 'logout' });
    }



    return (
        <AuthContext.Provider value={{ login, logout, user, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}




function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context;
}

export { AuthProvider, useAuth };









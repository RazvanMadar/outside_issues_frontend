import React, {createContext, useContext, useState} from 'react';

// CHAT GPT
// Create a context with default value of false
const AuthContext = createContext({
    isLogged: false,
    token: null,
    userId: null,
    login: (token, userId) => {},
    logout: () => {},
});

const useAuth = () => useContext(AuthContext);

// Create a provider component to wrap around your application
const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isLogged, setIsLogged] = useState(false);

    const login = (token, userId) => {
        setToken(token);
        setUserId(userId);
        setIsLogged(true);
        console.log("mai intra aici?")
    };

    const logout = () => {
        setToken(null);
        setUserId(null);
        setIsLogged(false);
    };

    return (
        <AuthContext.Provider
            value={{
                isLogged,
                token,
                userId,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider, useAuth };
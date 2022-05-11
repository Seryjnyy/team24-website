import { createContext, useContext, useState } from "react";
import jwt_decode from "jwt-decode";


const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userID, setUserID] = useState(null)

    const login = async (username, password) => {
        let success;

        await fetch('https://1kkhj7pk6k.execute-api.eu-west-2.amazonaws.com/UserLogin?username='+username+'&password='+password,
            {
                method: 'POST'
            })
            .then((response) => {
                success = response.status === 200;

                return response.json();
            })
            .then((data) => {
                setLocalStorage("userAccessToken", data.access_token);
                setLocalStorage("userRefreshToken", data.refresh_token);

                setUserID(data.userID);
                setUser(data.userID);
            })
            .catch((error) => { console.log(error); success = false });

        return success;
    }
    const getUserID = () => {
        return userID;
    }

    const register = async (firstname, lastname, username, password) => {
        let success;

        await fetch('https://k67ar4jv19.execute-api.eu-west-2.amazonaws.com/UserRegister', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    'firstname': firstname,
                    'lastname': lastname,
                    'email': username,
                    'password': password
                }
            )
        })
            .then((response) => {
                success = response.status === 200;

                return response.json()
            })
            .catch((error) => { console.log(error); success = false });

        return success;
    }

    const logout = () => {
        localStorage.removeItem("userAccessToken");
        localStorage.removeItem("userRefreshToken");

        setUser(null);
        setUserID(null);
    }

    const isLoggedIn = () => {
        var user = localStorage.getItem("userAccessToken");

        // no tokens
        if(user === null){
            return false;
        }

        // token expired
        if(jwt_decode(user).exp < Date.now() / 1000){
            logout();
            return false;
          }

        // otherwise true
        return true;
    }

    const getAccessToken = () => {
        if(localStorage.getItem("userAccessToken") === null)
            return "";
        return localStorage.getItem("userAccessToken");
    }

    const getRefreshToken = () => {
        if(localStorage.getItem("userAccessToken") === null)
            return "";
        return localStorage.getItem("userRefreshToken");
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout, isLoggedIn, getAccessToken, getRefreshToken, getUserID }}>{children}</AuthContext.Provider>
    )
}

const setLocalStorage = (name, data) => {
    localStorage.setItem(name, data);
}

export const useAuth = () => {
    return useContext(AuthContext);
}